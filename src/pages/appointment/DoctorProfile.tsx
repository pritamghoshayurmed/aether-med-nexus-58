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

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("about");

  // Mock doctor data - in real app this would come from API
  const mockDoctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    rating: 4.9,
    reviews: 324,
    experience: 15,
    fee: 150,
    location: "New York, NY",
    distance: "2.5 km",
    avatar: "SJ",
    consultationTypes: ["Video Call", "In-Person"],
    nextAvailable: "Today 2:30 PM",
    languages: ["English", "Spanish"],
    education: ["Harvard Medical School", "Johns Hopkins University"],
    certifications: ["Board Certified Cardiologist", "FACC", "FSCAI"],
    aboutMe: "Dr. Sarah Johnson is a highly experienced interventional cardiologist with over 15 years of dedicated practice. She specializes in complex cardiac procedures including angioplasty, stent placement, and cardiac catheterization. Dr. Johnson is committed to providing personalized care and staying at the forefront of cardiovascular medicine.",
    specializations: [
      "Interventional Cardiology",
      "Cardiac Catheterization", 
      "Angioplasty & Stenting",
      "Heart Disease Prevention",
      "Cardiovascular Risk Assessment"
    ],
    awards: [
      "Top Doctor Award 2023",
      "Excellence in Patient Care 2022",
      "Research Excellence Award 2021"
    ],
    publications: [
      "Advanced Techniques in Interventional Cardiology - Journal of Cardiology, 2023",
      "Risk Assessment in Cardiovascular Disease - American Heart Journal, 2022",
      "Minimally Invasive Cardiac Procedures - Circulation Research, 2021"
    ],
    workingHours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM", 
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    reviewsData: [
      {
        id: 1,
        patient: "John D.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Dr. Johnson is exceptional. She explained everything clearly and made me feel comfortable throughout the procedure.",
        verified: true
      },
      {
        id: 2,
        patient: "Maria S.",
        rating: 5,
        date: "1 month ago", 
        comment: "Highly professional and caring. The best cardiologist I've ever worked with. Highly recommend!",
        verified: true
      },
      {
        id: 3,
        patient: "Robert K.",
        rating: 4,
        date: "2 months ago",
        comment: "Great doctor with excellent bedside manner. Wait time was a bit long but worth it.",
        verified: true
      }
    ]
  };

  useEffect(() => {
    // In real app, fetch doctor data based on doctorId
    setDoctor(mockDoctor);
  }, [doctorId]);

  const handleBookAppointment = () => {
    navigate(`/appointment/doctor/${doctorId}/schedule`);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

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
                    {doctor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{doctor.name}</h1>
                  <p className="text-primary font-semibold text-lg mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 text-gray-200 mb-3">
                    <Building className="h-4 w-4" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-300">({doctor.reviewsData.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-200">
                      <Users className="h-4 w-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-200">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.distance} away</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-64 space-y-4">
                <div>
                  <p className="text-sm text-gray-200 mb-2">Consultation Fee</p>
                  <p className="text-3xl font-bold text-primary">${doctor.fee}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-200 mb-2">Available for:</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.consultationTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="flex items-center gap-1">
                        {type === "Video Call" && <Video className="h-3 w-3" />}
                        {type === "Phone Call" && <Phone className="h-3 w-3" />}
                        {type === "In-Person" && <Building className="h-3 w-3" />}
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">Next available: {doctor.nextAvailable}</span>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>About Dr. {doctor.name.split(' ')[1]}</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <p className="text-gray-200 leading-relaxed mb-6">{doctor.aboutMe}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      Specializations
                    </h4>
                    <ul className="space-y-2">
                      {doctor.specializations.map((spec, index) => (
                        <li key={index} className="text-gray-200 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Languages className="h-4 w-4 text-primary" />
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education & Certifications
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Education</h4>
                    <ul className="space-y-2">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="text-gray-200 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Certifications</h4>
                    <ul className="space-y-2">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-200 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Awards & Recognition
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <ul className="space-y-3">
                  {doctor.awards.map((award, index) => (
                    <li key={index} className="text-gray-200 flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      {award}
                    </li>
                  ))}
                </ul>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>Patient Reviews ({doctor.reviewsData.length})</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-6">
                  {doctor.reviewsData.map((review, index) => (
                    <div key={review.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{review.patient}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-sm text-gray-200 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-200">{review.comment}</p>
                      {index < doctor.reviewsData.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="schedule">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>Working Hours</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {Object.entries(doctor.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2">
                      <span className="font-medium capitalize">{day}</span>
                      <span className="text-gray-300">{String(hours)}</span>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="location">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>Location & Contact</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Hospital Address</h4>
                    <p className="text-gray-200">{doctor.hospital}</p>
                    <p className="text-gray-200">{doctor.location}</p>
                  </div>
                  
                  <div className="bg-muted/50 h-48 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map integration would go here</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
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