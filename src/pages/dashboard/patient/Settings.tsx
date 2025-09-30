import { useState, useEffect } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Camera,
  Edit,
  Save,
  AlertCircle,
  Download,
  Share
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePatient } from "@/hooks/useDatabase";

const PatientSettings = () => {
  const { user, profile, updateProfile } = useAuth();
  const { patient, loading, updatePatient } = usePatient();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
    emergencyName: ""
  });

  useEffect(() => {
    console.log('Profile or patient data changed:', { profile, patient });
    
    if (profile && patient) {
      const newProfileData = {
        name: profile.full_name || "",
        email: profile.email || "",
        phone: patient.phone_number || "",
        dateOfBirth: patient.date_of_birth || "",
        gender: patient.gender || "",
        bloodGroup: patient.blood_group || "",
        address: patient.address || "",
        emergencyContact: patient.emergency_contact_number || "",
        emergencyName: patient.emergency_contact_name || ""
      };
      
      console.log('Setting profile data:', newProfileData);
      setProfileData(newProfileData);
    }
  }, [profile, patient]);

  const [notifications, setNotifications] = useState({
    appointments: true,
    medication: true,
    vitals: false,
    marketing: false,
    aiInsights: true
  });

  const medicalInfo = [
    { label: "Blood Group", value: profileData.bloodGroup || "Not Set", icon: Heart },
    { label: "Gender", value: profileData.gender || "Not Set", icon: User },
    { label: "Age", value: profileData.dateOfBirth ? new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear() + " years" : "Not Set", icon: Calendar },
    { label: "Emergency Contact", value: profileData.emergencyName || "Not Set", icon: AlertCircle },
  ];

  const handleSave = async () => {
    try {
      console.log('Saving profile data:', profileData);
      
      // Update profile
      if (profile) {
        await updateProfile({
          full_name: profileData.name,
          email: profileData.email,
        });
      }
      
      // Update patient data
      if (patient) {
        await updatePatient({
          phone_number: profileData.phone,
          date_of_birth: profileData.dateOfBirth,
          gender: profileData.gender,
          blood_group: profileData.bloodGroup,
          address: profileData.address,
          emergency_contact_number: profileData.emergencyContact,
          emergency_contact_name: profileData.emergencyName
        });
      }
      
      console.log('All data saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Profile Information
                  </div>
                  <MedicalButton
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-1 h-4 w-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </MedicalButton>
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    {isEditing && (
                      <MedicalButton variant="outline" size="sm">
                        <Camera className="mr-1 h-4 w-4" />
                        Change Photo
                      </MedicalButton>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input
                        value={profileData.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date of Birth</label>
                      <Input
                        type="date"
                        value={profileData.dateOfBirth}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Gender</label>
                      <Select value={profileData.gender} disabled={!isEditing} onValueChange={(value) => setProfileData({...profileData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Blood Group</label>
                      <Select value={profileData.bloodGroup} disabled={!isEditing} onValueChange={(value) => setProfileData({...profileData, bloodGroup: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center">
                          <Mail className="mr-1 h-4 w-4" />
                          Email
                        </label>
                        <Input
                          type="email"
                          value={profileData.email}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center">
                          <Phone className="mr-1 h-4 w-4" />
                          Phone
                        </label>
                        <Input
                          value={profileData.phone}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-2 block flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          Address
                        </label>
                        <Input
                          value={profileData.address}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                          value={profileData.emergencyName}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({...profileData, emergencyName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <Input
                          value={profileData.emergencyContact}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Notification Settings */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notification Preferences
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="text-sm text-muted-foreground">
                          {key === 'appointments' && 'Get notified about upcoming appointments'}
                          {key === 'medication' && 'Reminders for medication schedules'}
                          {key === 'vitals' && 'Daily vitals monitoring reminders'}
                          {key === 'marketing' && 'Health tips and promotional content'}
                          {key === 'aiInsights' && 'AI-powered health insights and recommendations'}
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Medical Information */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Medical Info
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {medicalInfo.map((info, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-2">
                        <info.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{info.label}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {info.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Privacy & Security */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Privacy & Security
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Data
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Language Settings
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Quick Actions */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Quick Actions</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <MedicalButton variant="medical" className="w-full">
                    <Share className="mr-2 h-4 w-4" />
                    Share Profile
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Sync Calendar
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientSettings;