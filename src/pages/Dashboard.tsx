import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, AlertTriangle, Bell, Check, Clock, Pill, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import RegisteredUsers from '@/components/dashboard/RegisteredUsers';

const Dashboard = () => {
  const {
    isAuthenticated, user, selectedElderlyId, elderlyProfiles,
    activityLogs, medications, alerts,
    setSelectedElderly, markMedicationTaken, acknowledgeAlert,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  const elderly = elderlyProfiles.find((e) => e.id === selectedElderlyId);
  const elderlyActivities = activityLogs.filter((a) => a.elderlyId === selectedElderlyId);
  const elderlyMeds = medications.filter((m) => m.elderlyId === selectedElderlyId);
  const elderlyAlerts = alerts.filter((a) => a.elderlyId === selectedElderlyId);
  const activeAlerts = elderlyAlerts.filter((a) => !a.acknowledged);

  const medsTaken = elderlyMeds.filter((m) => m.status === 'taken').length;

  if (!elderly) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <Select value={selectedElderlyId} onValueChange={setSelectedElderly}>
            <SelectTrigger className="w-[220px]">
              <User className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {elderlyProfiles.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Status', value: elderly.status === 'active' ? 'Active' : 'Inactive', icon: Activity, color: elderly.status === 'active' ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' : 'text-destructive bg-destructive/10' },
            { label: 'Last Activity', value: elderly.lastActivity, icon: Clock, color: 'text-primary bg-primary/10' },
            { label: 'Medications', value: `${medsTaken}/${elderlyMeds.length}`, icon: Pill, color: 'text-secondary bg-secondary/10' },
            { label: 'Active Alerts', value: String(activeAlerts.length), icon: Bell, color: activeAlerts.length > 0 ? 'text-destructive bg-destructive/10' : 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activity Timeline */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {elderlyActivities.map((log) => (
                <div key={log.id} className={`flex items-start gap-3 p-3 rounded-xl ${log.isNormal ? 'bg-muted/50' : 'bg-destructive/5 border border-destructive/20'}`}>
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${log.isNormal ? 'bg-primary' : 'bg-destructive'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{log.description}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  {!log.isNormal && <Badge variant="destructive" className="text-xs shrink-0">Anomaly</Badge>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {elderlyAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-xl border ${alert.acknowledged ? 'bg-muted/30 border-border/50 opacity-60' : alert.severity === 'high' ? 'bg-destructive/5 border-destructive/20' : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/30'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                  {!alert.acknowledged && (
                    <Button size="sm" variant="outline" className="shrink-0 text-xs" onClick={() => acknowledgeAlert(alert.id)}>
                      <Check className="h-3 w-3 mr-1" /> Ack
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Medication Schedule */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Pill className="h-5 w-5 text-secondary" />
              Medication Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {elderlyMeds.map((med) => (
                <div key={med.id} className={`flex items-center justify-between p-4 rounded-xl border ${med.status === 'taken' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30' : med.status === 'missed' ? 'bg-destructive/5 border-destructive/20' : 'bg-muted/30 border-border/50'}`}>
                  <div>
                    <p className="font-medium text-sm text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage} · {med.time}</p>
                  </div>
                  {med.status === 'pending' ? (
                    <Button size="sm" className="gradient-primary text-primary-foreground border-0 text-xs" onClick={() => markMedicationTaken(med.id)}>
                      Take
                    </Button>
                  ) : (
                    <Badge variant={med.status === 'taken' ? 'secondary' : 'destructive'} className="text-xs">
                      {med.status === 'taken' ? '✓ Taken' : 'Missed'}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
