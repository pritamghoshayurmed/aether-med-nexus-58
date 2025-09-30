import { useState } from "react";
import { 
  Bell, 
  Calendar, 
  Heart, 
  Pill, 
  AlertTriangle,
  CheckCircle,
  Info,
  Trash,
  Settings,
  Filter
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    medications: true,
    testResults: true,
    aiInsights: true,
    promotions: false,
    systemUpdates: true
  });

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment Reminder",
      message: "You have an appointment with Dr. Sarah Johnson tomorrow at 2:30 PM",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
      color: "text-primary"
    },
    {
      id: 2,
      type: "medication",
      title: "Medication Reminder",
      message: "Time to take your Lisinopril 10mg. Take with food.",
      time: "5 hours ago",
      read: false,
      icon: Pill,
      color: "text-warning"
    },
    {
      id: 3,
      type: "test_result",
      title: "Lab Results Available",
      message: "Your Complete Blood Count test results are now available to view.",
      time: "1 day ago",
      read: true,
      icon: Heart,
      color: "text-success"
    },
    {
      id: 4,
      type: "alert",
      title: "Health Alert",
      message: "Your blood pressure reading was higher than normal. Consider consulting your doctor.",
      time: "1 day ago",
      read: false,
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      id: 5,
      type: "ai_insight",
      title: "AI Health Insight",
      message: "Based on your recent vitals, your cardiovascular health is improving. Keep up the good work!",
      time: "2 days ago",
      read: true,
      icon: Info,
      color: "text-primary"
    },
    {
      id: 6,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Michael Chen on Jan 25 has been confirmed.",
      time: "2 days ago",
      read: true,
      icon: CheckCircle,
      color: "text-success"
    },
    {
      id: 7,
      type: "medication",
      title: "Prescription Expiring Soon",
      message: "Your prescription for Atorvastatin expires in 7 days. Request a refill soon.",
      time: "3 days ago",
      read: true,
      icon: Pill,
      color: "text-warning"
    },
    {
      id: 8,
      type: "system",
      title: "New Feature Available",
      message: "You can now book video consultations directly through the app!",
      time: "4 days ago",
      read: true,
      icon: Info,
      color: "text-primary"
    },
    {
      id: 9,
      type: "test_result",
      title: "Lipid Profile Results",
      message: "Your lipid profile test results show elevated cholesterol. Review recommendations.",
      time: "5 days ago",
      read: true,
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      id: 10,
      type: "appointment",
      title: "Appointment Rescheduled",
      message: "Your appointment has been rescheduled to Jan 22 at 11:00 AM",
      time: "1 week ago",
      read: true,
      icon: Calendar,
      color: "text-primary"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // Mark all as read logic
    console.log("Marking all as read");
  };

  const deleteNotification = (id: number) => {
    // Delete notification logic
    console.log("Deleting notification:", id);
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="gradient-text">Notifications</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MedicalButton 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              className="min-h-[40px]"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark All Read
            </MedicalButton>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm min-h-[44px]">
              All Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm min-h-[44px]">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* All Notifications Tab */}
          <TabsContent value="all" className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <MedicalButton
                variant={filter === "all" ? "medical" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="min-h-[36px]"
              >
                All
              </MedicalButton>
              <MedicalButton
                variant={filter === "unread" ? "medical" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className="min-h-[36px]"
              >
                Unread ({unreadCount})
              </MedicalButton>
              <MedicalButton
                variant={filter === "appointment" ? "medical" : "outline"}
                size="sm"
                onClick={() => setFilter("appointment")}
                className="min-h-[36px]"
              >
                Appointments
              </MedicalButton>
              <MedicalButton
                variant={filter === "medication" ? "medical" : "outline"}
                size="sm"
                onClick={() => setFilter("medication")}
                className="min-h-[36px]"
              >
                Medications
              </MedicalButton>
              <MedicalButton
                variant={filter === "test_result" ? "medical" : "outline"}
                size="sm"
                onClick={() => setFilter("test_result")}
                className="min-h-[36px]"
              >
                Test Results
              </MedicalButton>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <MedicalCard 
                  key={notification.id} 
                  variant="glass"
                  className={`transition-all ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <MedicalCardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`bg-primary/10 p-2 sm:p-3 rounded-lg flex-shrink-0 ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-sm sm:text-base pr-2">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs flex-shrink-0">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <MedicalButton
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4" />
                          </MedicalButton>
                        </div>
                      </div>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              ))}

              {filteredNotifications.length === 0 && (
                <MedicalCard variant="glass">
                  <MedicalCardContent className="p-8 sm:p-12 text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! Check back later for updates.
                    </p>
                  </MedicalCardContent>
                </MedicalCard>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <MedicalCard variant="glass">
              <MedicalCardContent className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appointments" className="text-base">
                          Appointments
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders and updates about your appointments
                        </p>
                      </div>
                      <Switch
                        id="appointments"
                        checked={notificationSettings.appointments}
                        onCheckedChange={(checked) => handleSettingChange('appointments', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="medications" className="text-base">
                          Medications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders to take your medications
                        </p>
                      </div>
                      <Switch
                        id="medications"
                        checked={notificationSettings.medications}
                        onCheckedChange={(checked) => handleSettingChange('medications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="testResults" className="text-base">
                          Test Results
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Alerts when lab results are available
                        </p>
                      </div>
                      <Switch
                        id="testResults"
                        checked={notificationSettings.testResults}
                        onCheckedChange={(checked) => handleSettingChange('testResults', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="aiInsights" className="text-base">
                          AI Health Insights
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Personalized health recommendations
                        </p>
                      </div>
                      <Switch
                        id="aiInsights"
                        checked={notificationSettings.aiInsights}
                        onCheckedChange={(checked) => handleSettingChange('aiInsights', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="promotions" className="text-base">
                          Promotions & Offers
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Special offers and health packages
                        </p>
                      </div>
                      <Switch
                        id="promotions"
                        checked={notificationSettings.promotions}
                        onCheckedChange={(checked) => handleSettingChange('promotions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="systemUpdates" className="text-base">
                          System Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Important app updates and features
                        </p>
                      </div>
                      <Switch
                        id="systemUpdates"
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <MedicalButton className="w-full min-h-[44px]">
                    Save Preferences
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Notifications;
