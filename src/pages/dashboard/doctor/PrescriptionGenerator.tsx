import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Pill, 
  Calendar, 
  User,
  Download,
  Send,
  Edit,
  Trash2,
  Clock,
  AlertTriangle
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  status: "draft" | "sent" | "filled";
  medications: Medication[];
  diagnosis: string;
  notes?: string;
}

const PrescriptionGenerator = () => {
  const [activeTab, setActiveTab] = useState<"create" | "history">("create");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);

  const recentPrescriptions: Prescription[] = [
    {
      id: "1",
      patientName: "Alice Johnson",
      patientId: "P001",
      date: "2024-01-20",
      status: "sent",
      diagnosis: "Hypertension",
      medications: [
        {
          id: "1",
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take with or without food"
        }
      ]
    },
    {
      id: "2", 
      patientName: "Robert Davis",
      patientId: "P002",
      date: "2024-01-19",
      status: "filled",
      diagnosis: "Type 2 Diabetes",
      medications: [
        {
          id: "2",
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "30 days", 
          instructions: "Take with meals"
        }
      ]
    }
  ];

  const commonMedications = [
    "Lisinopril", "Metformin", "Atorvastatin", "Levothyroxine", 
    "Amlodipine", "Omeprazole", "Metoprolol", "Losartan"
  ];

  const frequencyOptions = [
    "Once daily", "Twice daily", "Three times daily", "Four times daily",
    "Every 8 hours", "Every 12 hours", "As needed", "Before meals", "After meals"
  ];

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const generatePrescription = () => {
    // Handle prescription generation
    console.log("Generating prescription for:", selectedPatient);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Digital Prescription</span>
            </h1>
            <p className="text-muted-foreground">Create and manage digital prescriptions</p>
          </div>
          <div className="flex space-x-2">
            <MedicalButton
              variant={activeTab === "create" ? "medical" : "outline"}
              onClick={() => setActiveTab("create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </MedicalButton>
            <MedicalButton
              variant={activeTab === "history" ? "medical" : "outline"}
              onClick={() => setActiveTab("history")}
            >
              <FileText className="mr-2 h-4 w-4" />
              History
            </MedicalButton>
          </div>
        </div>

        {activeTab === "create" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Prescription Form */}
              <div className="lg:col-span-2">
                <MedicalCard variant="glass">
                  <MedicalCardHeader>
                    <MedicalCardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      New Prescription
                    </MedicalCardTitle>
                  </MedicalCardHeader>
                  <MedicalCardContent className="space-y-6">
                    {/* Patient Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Patient</label>
                      <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a patient..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alice">Alice Johnson - P001</SelectItem>
                          <SelectItem value="robert">Robert Davis - P002</SelectItem>
                          <SelectItem value="sarah">Sarah Wilson - P003</SelectItem>
                          <SelectItem value="michael">Michael Brown - P004</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Diagnosis */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Diagnosis</label>
                      <Input
                        placeholder="Enter primary diagnosis..."
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>

                    {/* Medications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Medications</label>
                        <MedicalButton variant="outline" size="sm" onClick={addMedication}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add Medication
                        </MedicalButton>
                      </div>

                      {medications.map((medication, index) => (
                        <MedicalCard key={medication.id} variant="glass" className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium">Medication {index + 1}</h4>
                            <MedicalButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeMedication(medication.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </MedicalButton>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-xs font-medium">Medication Name</label>
                              <Select 
                                value={medication.name}
                                onValueChange={(value) => updateMedication(medication.id, "name", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select medication..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {commonMedications.map(med => (
                                    <SelectItem key={med} value={med}>{med}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-medium">Dosage</label>
                              <Input
                                placeholder="e.g., 10mg"
                                value={medication.dosage}
                                onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-medium">Frequency</label>
                              <Select 
                                value={medication.frequency}
                                onValueChange={(value) => updateMedication(medication.id, "frequency", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {frequencyOptions.map(freq => (
                                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-medium">Duration</label>
                              <Input
                                placeholder="e.g., 30 days"
                                value={medication.duration}
                                onChange={(e) => updateMedication(medication.id, "duration", e.target.value)}
                              />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-medium">Special Instructions</label>
                              <Textarea
                                placeholder="e.g., Take with food, avoid alcohol..."
                                value={medication.instructions}
                                onChange={(e) => updateMedication(medication.id, "instructions", e.target.value)}
                                rows={2}
                              />
                            </div>
                          </div>
                        </MedicalCard>
                      ))}

                      {medications.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                          <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground mb-2">No medications added</p>
                          <MedicalButton variant="outline" size="sm" onClick={addMedication}>
                            <Plus className="mr-1 h-3 w-3" />
                            Add First Medication
                          </MedicalButton>
                        </div>
                      )}
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Additional Notes</label>
                      <Textarea
                        placeholder="Any additional instructions or follow-up notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <MedicalButton variant="outline" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Save as Draft
                      </MedicalButton>
                      <MedicalButton variant="medical" className="flex-1" onClick={generatePrescription}>
                        <Send className="mr-2 h-4 w-4" />
                        Generate & Send
                      </MedicalButton>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              </div>

              {/* Prescription Preview */}
              <div className="lg:col-span-1">
                <MedicalCard variant="glass">
                  <MedicalCardHeader>
                    <MedicalCardTitle>Prescription Preview</MedicalCardTitle>
                  </MedicalCardHeader>
                  <MedicalCardContent>
                    <div className="space-y-4 text-sm">
                      <div className="text-center border-b pb-2">
                        <h3 className="font-bold">Dr. Sarah Johnson</h3>
                        <p className="text-muted-foreground">Cardiologist</p>
                        <p className="text-muted-foreground">License: MD12345</p>
                      </div>

                      {selectedPatient && (
                        <div className="space-y-1">
                          <p><strong>Patient:</strong> {selectedPatient}</p>
                          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                          {diagnosis && <p><strong>Diagnosis:</strong> {diagnosis}</p>}
                        </div>
                      )}

                      {medications.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-medium">Rx:</p>
                          {medications.map((med, index) => (
                            <div key={med.id} className="p-2 bg-muted/30 rounded text-xs">
                              <p><strong>{index + 1}. {med.name}</strong></p>
                              <p>{med.dosage} - {med.frequency}</p>
                              <p>Duration: {med.duration}</p>
                              {med.instructions && <p>Instructions: {med.instructions}</p>}
                            </div>
                          ))}
                        </div>
                      )}

                      {notes && (
                        <div>
                          <p className="font-medium">Notes:</p>
                          <p className="text-muted-foreground">{notes}</p>
                        </div>
                      )}
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search prescriptions by patient name or medication..." className="pl-10" />
            </div>

            {/* Prescription History */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Prescriptions</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{prescription.patientName}</h3>
                            <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="text-xs text-primary">{new Date(prescription.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            prescription.status === "filled" ? "secondary" :
                            prescription.status === "sent" ? "default" : "outline"
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm font-medium">Medications:</p>
                        {prescription.medications.map((med, index) => (
                          <div key={med.id} className="text-sm text-muted-foreground ml-4">
                            {index + 1}. {med.name} {med.dosage} - {med.frequency} for {med.duration}
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <MedicalButton variant="outline" size="sm">
                          <FileText className="mr-1 h-3 w-3" />
                          View
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm">
                          <Edit className="mr-1 h-3 w-3" />
                          Modify
                        </MedicalButton>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        )}
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default PrescriptionGenerator;