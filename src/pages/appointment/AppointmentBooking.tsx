import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Calendar, Search, MapPin, Star, Clock, Users, Filter, ArrowLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useDoctors } from "@/hooks/useDoctors";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  
  const { doctors, loading } = useDoctors({
    specialty: selectedSpecialty,
    searchQuery,
  });
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Dermatology", 
    "General Medicine",
    "Gynecology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology"
  ];

  const consultationTypes = [
    "All Types",
    "Video Call",
    "In-Person",
    "Phone Call"
  ];

  useEffect(() => {
    let filtered = doctors;

    // Additional client-side filters
    // (search and specialty are already filtered in the hook)
    
    // Price filter
    if (priceRange && priceRange.length === 2) {
      filtered = filtered.filter(doctor => 
        doctor.consultation_fee >= priceRange[0] && 
        doctor.consultation_fee <= priceRange[1]
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, priceRange]);

  const handleDoctorSelect = (doctorId) => {
    navigate(`/appointment/doctor/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search doctors, specialties, or hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-[180px] h-12">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.slice(1).map(specialty => (
                    <SelectItem key={specialty} value={specialty.toLowerCase()}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedConsultationType} onValueChange={setSelectedConsultationType}>
                <SelectTrigger className="w-[150px] h-12">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Video Call">Video Call</SelectItem>
                  <SelectItem value="In-Person">In-Person</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                    <SheetDescription>
                      Refine your search with additional filters
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Availability</Label>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="available" 
                            checked={availabilityFilter === "available"}
                            onCheckedChange={(checked) => setAvailabilityFilter(checked ? "available" : "all")}
                          />
                          <Label htmlFor="available">Available Today</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="all-availability" 
                            checked={availabilityFilter === "all"}
                            onCheckedChange={(checked) => setAvailabilityFilter(checked ? "all" : "available")}
                          />
                          <Label htmlFor="all-availability">Show All</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Rating</Label>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rating-4" />
                          <Label htmlFor="rating-4">4+ Stars</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rating-45" />
                          <Label htmlFor="rating-45">4.5+ Stars</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Price Range</Label>
                      <div className="mt-3">
                        <Input 
                          type="range" 
                          min="50" 
                          max="500" 
                          className="w-full" 
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>$50</span>
                          <span>$500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredDoctors.length} doctors found
          </p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDoctors.map((doctor) => {
              const doctorInitials = doctor.profiles?.full_name
                ?.split(' ')
                .map(n => n[0])
                .join('') || 'DR';
              const availableDays = doctor.available_days || [];
              
              return (
                <MedicalCard 
                  key={doctor.id} 
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-primary"
                  onClick={() => handleDoctorSelect(doctor.id)}
                >
                  <MedicalCardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Doctor Avatar and Basic Info */}
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-xl font-semibold flex-shrink-0">
                          {doctorInitials}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {doctor.profiles?.full_name || 'Doctor'}
                          </h3>
                          <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                          <p className="text-muted-foreground text-sm mb-2">{doctor.qualification}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{doctor.rating?.toFixed(1) || 'New'}</span>
                              <span>({doctor.total_reviews || 0} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{doctor.years_of_experience || 0} years exp</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Consultation Types and Availability */}
                      <div className="lg:w-64 space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Available days:</p>
                          <div className="flex flex-wrap gap-1">
                            {availableDays.length > 0 ? (
                              availableDays.slice(0, 3).map((day) => (
                                <Badge key={day} variant="secondary" className="text-xs capitalize">
                                  {day}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Schedule varies
                              </Badge>
                            )}
                            {availableDays.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{availableDays.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">View availability</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium">License: {doctor.license_number}</p>
                        </div>
                      </div>

                      {/* Price and Book Button */}
                      <div className="lg:w-32 flex lg:flex-col justify-between lg:justify-end items-end lg:items-stretch gap-4">
                        <div className="text-right lg:text-left">
                          <p className="text-2xl font-bold text-primary">${doctor.consultation_fee || 0}</p>
                          <p className="text-xs text-muted-foreground">Consultation fee</p>
                        </div>
                        <Button 
                          className="h-12 px-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDoctorSelect(doctor.id);
                          }}
                        >
                          Book Now
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              );
            })}
          </div>
        )}

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("all");
                setSelectedConsultationType("all");
                setAvailabilityFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default AppointmentBooking;