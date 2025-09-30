import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Edit,
  Save,
  AlertCircle,
  Shield,
  Activity,
  Droplets,
  Ruler,
  Weight
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePatient } from "@/hooks/useDatabase";

const Profile = () => {
  const { user, profile } = useAuth();
  const { patient, loading, updatePatient } = usePatient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    blood_group: '',
    phone_number: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    medical_history: '',
    allergies: '',
    current_medications: '',
    insurance_provider: '',
    insurance_number: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        date_of_birth: patient.date_of_birth || '',
        gender: patient.gender || '',
        blood_group: patient.blood_group || '',
        phone_number: patient.phone_number || '',
        address: patient.address || '',
        emergency_contact_name: patient.emergency_contact_name || '',
        emergency_contact_number: patient.emergency_contact_number || '',
        medical_history: patient.medical_history || '',
        allergies: patient.allergies || '',
        current_medications: patient.current_medications || '',
        insurance_provider: patient.insurance_provider || '',
        insurance_number: patient.insurance_number || '',
      });
    }
  }, [patient]);

  const calculateProfileCompletion = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = async () => {
    await updatePatient(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">My Profile</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your personal and medical information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Profile Header Card */}
            <MedicalCard variant="glass">
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/20">
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl sm:text-4xl font-bold">
                        {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold mb-2">{profile?.full_name}</h2>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user?.email}
                      </Badge>
                      {formData.phone_number && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {formData.phone_number}
                        </Badge>
                      )}
                      {formData.blood_group && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Droplets className="h-3 w-3" />
                          {formData.blood_group}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Profile Completion</span>
                        <span className="font-semibold">{profileCompletion}%</span>
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                    </div>
                  </div>

                  <div className="sm:ml-auto">
                    {!isEditing ? (
                      <MedicalButton
                        variant="medical"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </MedicalButton>
                    ) : (
                      <div className="flex gap-2">
                        <MedicalButton
                          variant="medical"
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </MedicalButton>
                        <MedicalButton
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </MedicalButton>
                      </div>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Personal Information */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.date_of_birth ? new Date(formData.date_of_birth).toLocaleDateString() : 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Gender</Label>
                    {isEditing ? (
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Blood Group</Label>
                    {isEditing ? (
                      <Select value={formData.blood_group} onValueChange={(value) => handleInputChange('blood_group', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
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
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.blood_group || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.phone_number || 'Not set'}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label>Address</Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your full address"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.address || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Medical Information */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Medical Information
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <Label>Medical History</Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.medical_history}
                        onChange={(e) => handleInputChange('medical_history', e.target.value)}
                        placeholder="Chronic conditions, past illnesses, etc."
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {formData.medical_history || 'No medical history recorded'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Allergies</Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        placeholder="List any allergies (medications, food, etc.)"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {formData.allergies || 'No allergies recorded'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Current Medications</Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.current_medications}
                        onChange={(e) => handleInputChange('current_medications', e.target.value)}
                        placeholder="List medications you're currently taking"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {formData.current_medications || 'No current medications'}
                      </p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Emergency Contact */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Emergency Contact
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    {isEditing ? (
                      <Input
                        value={formData.emergency_contact_name}
                        onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                        placeholder="Emergency contact name"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.emergency_contact_name || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Contact Phone</Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={formData.emergency_contact_number}
                        onChange={(e) => handleInputChange('emergency_contact_number', e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.emergency_contact_number || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Insurance Information */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Insurance Information
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Insurance Provider</Label>
                    {isEditing ? (
                      <Input
                        value={formData.insurance_provider}
                        onChange={(e) => handleInputChange('insurance_provider', e.target.value)}
                        placeholder="Provider name"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.insurance_provider || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Policy Number</Label>
                    {isEditing ? (
                      <Input
                        value={formData.insurance_number}
                        onChange={(e) => handleInputChange('insurance_number', e.target.value)}
                        placeholder="Policy number"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{formData.insurance_number || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Account Info</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Type</span>
                    <Badge variant="default">Patient</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm font-medium">
                      {patient?.created_at ? new Date(patient.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Verified</span>
                    <Badge variant="outline" className="text-success">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Profile Completeness Tips */}
            {profileCompletion < 100 && (
              <MedicalCard variant="glass">
                <MedicalCardHeader>
                  <MedicalCardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Complete Your Profile
                  </MedicalCardTitle>
                </MedicalCardHeader>
                <MedicalCardContent className="p-4 sm:p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete your profile to get better healthcare recommendations
                  </p>
                  <MedicalButton 
                    variant="medical" 
                    className="w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Update Profile
                  </MedicalButton>
                </MedicalCardContent>
              </MedicalCard>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Profile;
