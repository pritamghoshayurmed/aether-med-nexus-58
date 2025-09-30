import { useState } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Calendar,
  Video,
  Phone,
  Clock,
  Award,
  ThumbsUp,
  ChevronDown,
  SlidersHorizontal
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedConsultationType, setSelectedConsultationType] = useState("all");
  const [maxFee, setMaxFee] = useState([5000]);
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    "All Specialties",
    "Cardiologist",
    "General Medicine",
    "Dermatologist",
    "Pediatrician",
    "Gynecologist",
    "Orthopedic",
    "Neurologist",
    "Psychiatrist",
    "Dentist",
    "Ophthalmologist",
    "ENT Specialist"
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "15+ years",
      rating: 4.9,
      reviews: 234,
      consultationFee: 800,
      hospital: "Apollo Hospital",
      distance: "2.1 km",
      gender: "Female",
      languages: ["English", "Hindi"],
      nextAvailable: "Today, 2:30 PM",
      consultationTypes: ["Video", "In-Person"],
      avatar: "SJ",
      achievements: ["Best Cardiologist 2023", "500+ Successful Surgeries"],
      about: "Specialized in interventional cardiology with extensive experience in complex cardiac procedures."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Medicine",
      qualification: "MBBS, MD (Internal Medicine)",
      experience: "12+ years",
      rating: 4.8,
      reviews: 189,
      consultationFee: 600,
      hospital: "Max Healthcare",
      distance: "1.8 km",
      gender: "Male",
      languages: ["English", "Hindi", "Mandarin"],
      nextAvailable: "Tomorrow, 10:00 AM",
      consultationTypes: ["Video", "In-Person", "Chat"],
      avatar: "MC",
      achievements: ["Top General Physician 2022"],
      about: "Expert in managing chronic diseases and preventive healthcare."
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      qualification: "MBBS, MD (Dermatology)",
      experience: "10+ years",
      rating: 4.9,
      reviews: 312,
      consultationFee: 1000,
      hospital: "Fortis Hospital",
      distance: "3.2 km",
      gender: "Female",
      languages: ["English", "Hindi", "Punjabi"],
      nextAvailable: "Today, 4:00 PM",
      consultationTypes: ["Video", "In-Person"],
      avatar: "PS",
      achievements: ["Best Dermatologist Award", "Cosmetic Procedures Expert"],
      about: "Specialist in medical and cosmetic dermatology with focus on skin health."
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "18+ years",
      rating: 4.7,
      reviews: 445,
      consultationFee: 700,
      hospital: "City General Hospital",
      distance: "2.5 km",
      gender: "Male",
      languages: ["English", "Hindi", "Bengali"],
      nextAvailable: "Today, 11:00 AM",
      consultationTypes: ["Video", "In-Person"],
      avatar: "RK",
      achievements: ["Child Healthcare Excellence Award"],
      about: "Dedicated to providing comprehensive care for children from newborn to adolescence."
    },
    {
      id: 5,
      name: "Dr. Ananya Patel",
      specialty: "Gynecologist",
      qualification: "MBBS, MD (OB/GYN)",
      experience: "14+ years",
      rating: 4.9,
      reviews: 278,
      consultationFee: 900,
      hospital: "Apollo Hospital",
      distance: "2.1 km",
      gender: "Female",
      languages: ["English", "Hindi", "Gujarati"],
      nextAvailable: "Tomorrow, 9:00 AM",
      consultationTypes: ["Video", "In-Person"],
      avatar: "AP",
      achievements: ["Women's Health Excellence", "High-Risk Pregnancy Expert"],
      about: "Committed to women's health with expertise in obstetrics and gynecology."
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    const matchesGender = selectedGender === "all" || doctor.gender.toLowerCase() === selectedGender;
    const matchesFee = doctor.consultationFee <= maxFee[0];
    const matchesConsultation = selectedConsultationType === "all" || 
                               doctor.consultationTypes.some(type => 
                                 type.toLowerCase().includes(selectedConsultationType.toLowerCase())
                               );
    return matchesSearch && matchesSpecialty && matchesGender && matchesFee && matchesConsultation;
  });

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">Find Doctors</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Search and book appointments with qualified healthcare professionals
          </p>
        </div>

        {/* Search Bar */}
        <MedicalCard variant="glass" className="mb-6">
          <MedicalCardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by doctor name, specialty, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px]"
                />
              </div>
              <MedicalButton
                variant="outline"
                className="min-h-[44px]"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </MedicalButton>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Specialty</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="All Specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {specialties.slice(1).map(specialty => (
                          <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Consultation Type</Label>
                    <Select value={selectedConsultationType} onValueChange={setSelectedConsultationType}>
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="video">Video Consultation</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Gender</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">
                      Max Fee: ₹{maxFee[0]}
                    </Label>
                    <Slider
                      value={maxFee}
                      onValueChange={setMaxFee}
                      max={5000}
                      min={100}
                      step={100}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </MedicalCardContent>
        </MedicalCard>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <MedicalCard key={doctor.id} variant="glass">
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Doctor Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary/20">
                      <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
                        {doctor.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{doctor.qualification}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary">{doctor.specialty}</Badge>
                          <Badge variant="outline">{doctor.experience}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-lg">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{doctor.hospital} • {doctor.distance}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span>Next: {doctor.nextAvailable}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">Languages: {doctor.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-primary">₹{doctor.consultationFee}</span>
                        <span className="text-muted-foreground ml-1">/ consultation</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{doctor.about}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {doctor.consultationTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type === "Video" && <Video className="h-3 w-3 mr-1" />}
                          {type === "In-Person" && <MapPin className="h-3 w-3 mr-1" />}
                          {type === "Chat" && <Phone className="h-3 w-3 mr-1" />}
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <MedicalButton 
                        variant="medical" 
                        className="flex-1 sm:flex-initial min-h-[40px]"
                        onClick={() => window.location.href = `/appointment/doctor/${doctor.id}/schedule`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </MedicalButton>
                      <MedicalButton 
                        variant="outline" 
                        className="flex-1 sm:flex-initial min-h-[40px]"
                        onClick={() => window.location.href = `/appointment/doctor/${doctor.id}`}
                      >
                        View Profile
                      </MedicalButton>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          ))}

          {filteredDoctors.length === 0 && (
            <MedicalCard variant="glass">
              <MedicalCardContent className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <MedicalButton
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("all");
                    setSelectedGender("all");
                    setSelectedConsultationType("all");
                    setMaxFee([5000]);
                  }}
                >
                  Clear Filters
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>
          )}
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default FindDoctors;
