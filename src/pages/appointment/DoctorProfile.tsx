import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Video,
  Phone,
  Building,
  GraduationCap,
  Languages,
  Award,
  Heart,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useDoctor } from "@/hooks/useDoctors";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { doctor, loading } = useDoctor(doctorId);
  const [selectedTab, setSelectedTab] = useState("about");

  const handleBookAppointment = () => {
    navigate(`/appointment/doctor/${doctorId}/schedule`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Doctor not found</p>
          <Button onClick={() => navigate('/appointment/booking')}>
            Back to Doctors
          </Button>
        </div>
      </div>
    );
  }

  const doctorInitials = doctor.profiles?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('') || 'DR';
  const availableDays = doctor.available_days || [];

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-white">Doctor Profile</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Doctor Header Card */}
        <MedicalCard className="mb-6">
          <MedicalCardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex gap-4">
                <Avatar className="w-24 h-24 text-2xl">
                  <AvatarFallback className="bg-primary text-white text-2xl font-semibold">
                    {doctorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {doctor.profiles?.full_name || 'Doctor'}
                  </h1>
                  <p className="text-primary font-semibold text-lg mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 text-gray-200 mb-3">
                    <Building className="h-4 w-4" />
                    <span>{doctor.qualification}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{doctor.rating?.toFixed(1) || 'New'}</span>
                      <span className="text-gray-300">({doctor.total_reviews || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-200">
                      <Users className="h-4 w-4" />
                      <span>{doctor.years_of_experience || 0} years experience</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-200">
                      <Award className="h-4 w-4" />
                      <span>License: {doctor.license_number}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-64 space-y-4">
                <div>
                  <p className="text-sm text-gray-200 mb-2">Consultation Fee</p>
                  <p className="text-3xl font-bold text-primary">${doctor.consultation_fee || 0}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-200 mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableDays.length > 0 ? (
                      availableDays.map((day) => (
                        <Badge key={day} variant="secondary" className="capitalize">
                          {day}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">Schedule varies</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">View availability</span>
                </div>

                <Button 
                  className="w-full h-12" 
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>About {doctor.profiles?.full_name}</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <p className="text-gray-200 leading-relaxed mb-6">
                  {doctor.profiles?.full_name} is a qualified {doctor.specialty} specialist with {doctor.years_of_experience} years of experience.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Qualification
                    </h4>
                    <p className="text-gray-200">{doctor.qualification}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      License Number
                    </h4>
                    <p className="text-gray-200">{doctor.license_number}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Specialty
                    </h4>
                    <p className="text-gray-200">{doctor.specialty}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Experience
                    </h4>
                    <p className="text-gray-200">{doctor.years_of_experience} years</p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="schedule">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Available Days & Time Slots
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Available Days</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableDays.length > 0 ? (
                        availableDays.map((day) => (
                          <div key={day} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                            <p className="text-primary font-medium capitalize text-center">{day}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 col-span-full text-center py-4">
                          No schedule information available
                        </p>
                      )}
                    </div>
                  </div>

                  {doctor.available_time_slots && Object.keys(doctor.available_time_slots).length > 0 && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Time Slots by Day</h4>
                      <div className="space-y-3">
                        {Object.entries(doctor.available_time_slots).map(([day, slots]: [string, any]) => (
                          <div key={day} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                            <span className="text-white capitalize font-medium min-w-[100px]">{day}:</span>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(slots) && slots.length > 0 ? (
                                slots.map((slot: string, idx: number) => (
                                  <Badge key={idx} variant="outline">{slot}</Badge>
                                ))
                              ) : (
                                <span className="text-gray-400 text-sm">No slots defined</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-border/30">
                    <Button 
                      className="w-full h-12" 
                      onClick={handleBookAppointment}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book an Appointment
                    </Button>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfile;