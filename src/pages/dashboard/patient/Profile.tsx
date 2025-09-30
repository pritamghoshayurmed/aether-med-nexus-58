import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Edit,
  Camera,
  Save,
  AlertCircle,
  Shield,
  Clock,
  Activity,
  Download,
  FileText,
  Users,
  Building2
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    bloodGroup: "O+",
    height: "165",
    weight: "65",
    address: "123 Health Street, Medical City, Delhi",
    emergencyContact: "+91 98765 43211",
    emergencyName: "John Johnson",
    emergencyRelation: "Spouse",
    occupation: "Software Engineer",
    maritalStatus: "Married"
  });

  const medicalHistory = [
    { condition: "Hypertension", diagnosedDate: "2020-03-15", status: "Managed" },
    { condition: "Type 2 Diabetes", diagnosedDate: "2019-08-20", status: "Managed" },
  ];

  const allergies = ["Penicillin", "Peanuts", "Latex"];
  const chronicConditions = ["Hypertension", "Type 2 Diabetes"];
  const surgeries = [
    { name: "Appendectomy", date: "2015-06-12", hospital: "City General Hospital" }
  ];

  const profileCompletion = 85;

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
    console.log("Profile updated:", profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <MedicalButton
                      variant="medical"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full shadow-lg min-w-[40px] min-h-[40px]"
                    >
                      <Camera className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h2 className="text-xl sm:text-2xl font-bold">{profile.name}</h2>
                      <MedicalButton
                        variant={isEditing ? "medical" : "outline"}
                        size="sm"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="mt-2 sm:mt-0 min-h-[40px]"
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-1 h-4 w-4" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="mr-1 h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </MedicalButton>
                    </div>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        {profile.bloodGroup}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()} years
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        {profile.gender}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Profile Completion</span>
                        <span className="font-semibold text-primary">{profileCompletion}%</span>
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Personal Information */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center text-base sm:text-lg">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Personal Information
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <Activity className="w-4 h-4 mr-2" />
                      Occupation
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.occupation}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.address}</p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Emergency Contact */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center text-base sm:text-lg">
                  <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
                  Emergency Contact
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Contact Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.emergencyName}
                        onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.emergencyName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Relationship
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.emergencyRelation}
                        onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.emergencyRelation}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="min-h-[44px]"
                      />
                    ) : (
                      <p className="text-foreground">{profile.emergencyContact}</p>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar - Medical Information */}
          <div className="space-y-4 sm:space-y-6">
            {/* Vital Stats */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg">Vital Statistics</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Blood Group</span>
                    <Badge variant="default">{profile.bloodGroup}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Height</span>
                    <span className="font-semibold">{profile.height} cm</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="font-semibold">{profile.weight} kg</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">BMI</span>
                    <span className="font-semibold">
                      {(parseInt(profile.weight) / ((parseInt(profile.height) / 100) ** 2)).toFixed(1)}
                    </span>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Medical History */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg flex items-center justify-between">
                  <span>Medical History</span>
                  <MedicalButton variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </MedicalButton>
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Chronic Conditions</h4>
                  <div className="space-y-2">
                    {chronicConditions.map((condition, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-warning mr-2" />
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Past Surgeries</h4>
                  <div className="space-y-2">
                    {surgeries.map((surgery, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{surgery.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(surgery.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Quick Actions */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg">Quick Actions</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-2">
                <MedicalButton variant="outline" className="w-full justify-start min-h-[44px]">
                  <Download className="mr-2 h-4 w-4" />
                  Download Health Card
                </MedicalButton>
                <MedicalButton variant="outline" className="w-full justify-start min-h-[44px]">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Family Members
                </MedicalButton>
                <MedicalButton variant="outline" className="w-full justify-start min-h-[44px]">
                  <Shield className="mr-2 h-4 w-4" />
                  Insurance Details
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Profile;
