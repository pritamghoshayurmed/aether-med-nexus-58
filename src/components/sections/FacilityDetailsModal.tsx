import { 
  X, 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  Star,
  Bed,
  Pill,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";

interface Location {
  latitude: number;
  longitude: number;
}

interface FacilityDetailsModalProps {
  facility: {
    name: string;
    type: 'Hospital' | 'Pharmacy';
    distance: string;
    status: string;
    address?: string;
    phone?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
  };
  userLocation: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FacilityDetailsModal = ({ 
  facility, 
  userLocation,
  isOpen, 
  onClose 
}: FacilityDetailsModalProps) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: 'phone' | 'address') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const openGoogleMaps = () => {
    if (facility.latitude && facility.longitude) {
      // Direct to facility
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`,
        '_blank'
      );
    } else if (userLocation && facility.address) {
      // Search by name and address from user location
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${encodeURIComponent(facility.name + ', ' + facility.address)}`,
        '_blank'
      );
    } else {
      // Just search for the facility
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + (facility.address ? ', ' + facility.address : ''))}`,
        '_blank'
      );
    }
  };

  const makePhoneCall = () => {
    if (facility.phone) {
      window.location.href = `tel:${facility.phone}`;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-background rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b p-4 flex items-start justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center space-x-2 mb-2">
                {facility.type === 'Hospital' ? (
                  <Bed className="h-5 w-5 text-primary" />
                ) : (
                  <Pill className="h-5 w-5 text-primary" />
                )}
                <h2 className="text-lg font-semibold">{facility.name}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={
                    facility.status === "available" || facility.status === "open" 
                      ? "default" 
                      : "secondary"
                  }
                >
                  {facility.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{facility.type}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Distance */}
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Navigation className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Distance</p>
                  <p className="text-xs text-muted-foreground">From your location</p>
                </div>
              </div>
              <span className="text-lg font-bold text-primary">{facility.distance}</span>
            </div>

            {/* Rating */}
            {facility.rating && (
              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{facility.rating.toFixed(1)} Rating</span>
              </div>
            )}

            {/* Address */}
            {facility.address && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold">Address</h3>
                </div>
                <div className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground flex-1">{facility.address}</p>
                  <button
                    onClick={() => copyToClipboard(facility.address!, 'address')}
                    className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy address"
                  >
                    {copiedAddress ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Phone */}
            {facility.phone && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold">Contact</h3>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-mono">{facility.phone}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(facility.phone!, 'phone')}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy phone"
                    >
                      {copiedPhone ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Service Hours Info */}
            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {facility.type === 'Hospital' ? 'Emergency Services' : 'Operating Hours'}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {facility.type === 'Hospital' 
                    ? 'Most hospitals provide 24/7 emergency services'
                    : 'Contact directly for current operating hours'
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <MedicalButton
                variant="medical"
                className="w-full"
                onClick={openGoogleMaps}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </MedicalButton>

              {facility.phone && (
                <MedicalButton
                  variant="outline"
                  className="w-full"
                  onClick={makePhoneCall}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </MedicalButton>
              )}

              <MedicalButton
                variant="outline"
                className="w-full"
                onClick={() => {
                  const searchQuery = encodeURIComponent(
                    facility.name + (facility.address ? ' ' + facility.address : '')
                  );
                  window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Search on Google
              </MedicalButton>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              💡 Tap on phone/address to copy • Directions open in Google Maps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
