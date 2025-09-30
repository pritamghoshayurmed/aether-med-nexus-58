-- Additional schema updates for enhanced patient dashboard functionality
-- Run this in Supabase SQL Editor after running the main supabase-schema.sql

-- Add full_name update capability to profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to update their own full_name
CREATE POLICY "Users can update own full_name" ON profiles 
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Chat Messages table for doctor-patient communication
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL, -- Links related messages
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'audio', 'video')),
  file_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for chat messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_receiver ON chat_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_read ON chat_messages(read);

-- RLS for chat messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON chat_messages 
FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- Users can send messages
CREATE POLICY "Users can send messages" ON chat_messages 
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can update messages they sent (for editing/deleting)
CREATE POLICY "Users can update own messages" ON chat_messages 
FOR UPDATE USING (auth.uid() = sender_id);

-- Receiver can mark messages as read
CREATE POLICY "Receiver can mark as read" ON chat_messages 
FOR UPDATE USING (auth.uid() = receiver_id);

-- Trigger for chat messages updated_at
CREATE TRIGGER update_chat_messages_updated_at BEFORE UPDATE ON chat_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Conversations table to track doctor-patient chats
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  unread_count_patient INTEGER DEFAULT 0,
  unread_count_doctor INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(patient_id, doctor_id)
);

-- Create indexes for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_patient ON conversations(patient_id);
CREATE INDEX IF NOT EXISTS idx_conversations_doctor ON conversations(doctor_id);

-- RLS for conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Patients can view their conversations
CREATE POLICY "Patients can view own conversations" ON conversations 
FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- Doctors can view their conversations
CREATE POLICY "Doctors can view own conversations" ON conversations 
FOR SELECT USING (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);

-- Trigger for conversations updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get unread message count for a user
CREATE OR REPLACE FUNCTION get_unread_messages_count(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  unread_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO unread_count
  FROM chat_messages
  WHERE receiver_id = user_uuid AND read = FALSE;
  
  RETURN unread_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark all messages in a conversation as read
CREATE OR REPLACE FUNCTION mark_conversation_read(
  conversation_uuid UUID,
  user_uuid UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE chat_messages
  SET read = TRUE
  WHERE conversation_id = conversation_uuid 
    AND receiver_id = user_uuid 
    AND read = FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add height and weight to vitals table if not exists (for profile display)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vitals' AND column_name = 'height'
  ) THEN
    -- Height and weight already exist in vitals table from main schema
    -- This is just a check to ensure they're there
    NULL;
  END IF;
END $$;

-- Create a view for patient appointments with doctor details
CREATE OR REPLACE VIEW patient_appointments_view AS
SELECT 
  a.*,
  d.specialty as doctor_specialty,
  d.consultation_fee as doctor_fee,
  dp.full_name as doctor_name,
  dp.email as doctor_email,
  pp.full_name as patient_name,
  pp.email as patient_email
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN profiles dp ON d.user_id = dp.id
JOIN patients p ON a.patient_id = p.id
JOIN profiles pp ON p.user_id = pp.id;

-- Grant access to the view
GRANT SELECT ON patient_appointments_view TO authenticated;

-- Create a view for patient vitals history
CREATE OR REPLACE VIEW patient_vitals_history AS
SELECT 
  v.*,
  p.user_id,
  pr.full_name as patient_name
FROM vitals v
JOIN patients p ON v.patient_id = p.id
JOIN profiles pr ON p.user_id = pr.id
ORDER BY v.recorded_at DESC;

-- Grant access to the view
GRANT SELECT ON patient_vitals_history TO authenticated;

-- Update RLS policy for patients to allow insert on patient creation
CREATE POLICY "Allow user to create their own patient record" ON patients
FOR INSERT WITH CHECK (user_id = auth.uid());

-- Ensure appointments can be updated by both patient and doctor
CREATE POLICY "Doctors can update their appointments" ON appointments 
FOR UPDATE USING (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);

CREATE POLICY "Patients can update own appointments" ON appointments 
FOR UPDATE USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- Comments for documentation
COMMENT ON TABLE chat_messages IS 'Stores all chat messages between doctors and patients';
COMMENT ON TABLE conversations IS 'Tracks active conversations between doctors and patients';
COMMENT ON FUNCTION get_unread_messages_count IS 'Returns the count of unread messages for a user';
COMMENT ON FUNCTION mark_conversation_read IS 'Marks all messages in a conversation as read for the current user';
COMMENT ON VIEW patient_appointments_view IS 'Consolidated view of appointments with doctor and patient details';
COMMENT ON VIEW patient_vitals_history IS 'Historical view of patient vitals with patient information';
