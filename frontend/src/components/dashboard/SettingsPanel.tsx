import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SettingsPanel() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">Clinic Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>WhatsApp API Key (Meta)</Label>
          <Input type="password" value="************************" readOnly className="bg-slate-50" />
        </div>
        <div className="space-y-2">
          <Label>Cloudinary URL</Label>
          <Input type="text" value="cloudinary://api_key:api_secret@elsan-clinic" readOnly className="bg-slate-50" />
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">Save Configuration</Button>
      </CardContent>
    </Card>
  );
}
