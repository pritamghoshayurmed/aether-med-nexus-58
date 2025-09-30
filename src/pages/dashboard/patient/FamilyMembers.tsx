import { useState } from "react";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash, 
  Heart,
  Calendar,
  Phone,
  Mail,
  User,
  Baby,
  UserCheck
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const FamilyMembers = () => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const familyMembers = [
    {
      id: 1,
      name: "John Johnson",
      relation: "Spouse",
      age: 45,
      gender: "Male",
      bloodGroup: "A+",
      dateOfBirth: "1979-03-20",
      phone: "+91 98765 43211",
      email: "john.johnson@email.com",
      allergies: ["None"],
      chronicConditions: ["Hypertension"],
      isPrimary: false
    },
    {
      id: 2,
      name: "Emma Johnson",
      relation: "Daughter",
      age: 12,
      gender: "Female",
      bloodGroup: "O+",
      dateOfBirth: "2012-07-15",
      phone: "",
      email: "",
      allergies: ["Peanuts"],
      chronicConditions: [],
      isPrimary: false
    },
    {
      id: 3,
      name: "Michael Johnson",
      relation: "Son",
      age: 8,
      gender: "Male",
      bloodGroup: "O+",
      dateOfBirth: "2016-11-05",
      phone: "",
      email: "",
      allergies: ["None"],
      chronicConditions: [],
      isPrimary: false
    },
    {
      id: 4,
      name: "Mary Smith",
      relation: "Mother",
      age: 68,
      gender: "Female",
      bloodGroup: "B+",
      dateOfBirth: "1956-02-10",
      phone: "+91 98765 43212",
      email: "mary.smith@email.com",
      allergies: ["Penicillin"],
      chronicConditions: ["Type 2 Diabetes", "Arthritis"],
      isPrimary: false
    }
  ];

  const getRelationIcon = (relation: string) => {
    switch (relation.toLowerCase()) {
      case "spouse":
        return <UserCheck className="h-5 w-5" />;
      case "son":
      case "daughter":
        return <Baby className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getAgeGroup = (age: number) => {
    if (age < 18) return "Child";
    if (age < 60) return "Adult";
    return "Senior";
  };

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="gradient-text">Family Members</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage healthcare for your family
            </p>
          </div>
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <MedicalButton variant="medical" className="min-h-[44px]">
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </MedicalButton>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Family Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" className="mt-1.5 min-h-[44px]" />
                </div>
                <div>
                  <Label htmlFor="relation">Relationship</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 min-h-[44px]">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="son">Son</SelectItem>
                      <SelectItem value="daughter">Daughter</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="brother">Brother</SelectItem>
                      <SelectItem value="sister">Sister</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" className="mt-1.5 min-h-[44px]" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 min-h-[44px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 min-h-[44px]">
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
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" placeholder="+91 " className="mt-1.5 min-h-[44px]" />
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" type="email" placeholder="email@example.com" className="mt-1.5 min-h-[44px]" />
                </div>
                <MedicalButton className="w-full min-h-[44px]">
                  Add Member
                </MedicalButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Primary Account Card */}
        <MedicalCard variant="glass" className="mb-6">
          <MedicalCardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-primary text-white text-xl sm:text-2xl font-bold">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-lg sm:text-xl font-bold">Sarah Johnson</h2>
                  <Badge variant="default" className="text-xs">Primary Account</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Self • 34 years • O+</p>
                <div className="flex flex-wrap gap-2">
                  <MedicalButton variant="outline" size="sm" className="min-h-[36px]">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit Profile
                  </MedicalButton>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Family Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyMembers.map((member) => (
            <MedicalCard key={member.id} variant="glass">
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {getRelationIcon(member.relation)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg mb-1">
                        {member.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {member.relation}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {getAgeGroup(member.age)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Age</p>
                      <p className="font-semibold">{member.age} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Blood Group</p>
                      <p className="font-semibold">{member.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Gender</p>
                      <p className="font-semibold">{member.gender}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Date of Birth</p>
                      <p className="font-semibold text-xs">
                        {new Date(member.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {(member.phone || member.email) && (
                    <div className="pt-3 border-t border-border space-y-2">
                      {member.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {(member.allergies.length > 0 && member.allergies[0] !== "None") && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Allergies</p>
                      <div className="flex flex-wrap gap-1">
                        {member.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.chronicConditions.length > 0 && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-1">
                        {member.chronicConditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <MedicalButton 
                    variant="medical" 
                    size="sm" 
                    className="flex-1 min-h-[40px]"
                    onClick={() => window.location.href = '/appointment/booking'}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </MedicalButton>
                  <MedicalButton variant="outline" size="sm" className="min-h-[40px]">
                    <Edit className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton variant="outline" size="sm" className="min-h-[40px]">
                    <Trash className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{familyMembers.length + 1}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Baby className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">
                {familyMembers.filter(m => m.age < 18).length}
              </p>
              <p className="text-xs text-muted-foreground">Children</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">
                {familyMembers.filter(m => m.age >= 18 && m.age < 60).length + 1}
              </p>
              <p className="text-xs text-muted-foreground">Adults</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">
                {familyMembers.filter(m => m.age >= 60).length}
              </p>
              <p className="text-xs text-muted-foreground">Seniors</p>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default FamilyMembers;
