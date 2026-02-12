import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-muted-foreground mb-10">Have questions? We'd love to hear from you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@playarena.in" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat, India" },
            ].map((item) => (
              <Card key={item.label} className="bg-card border-border/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="md:col-span-2 bg-card border-border/50">
            <CardHeader><CardTitle>Send us a Message</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-secondary/60" />
                  <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-secondary/60" />
                </div>
                <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="bg-secondary/60" />
                <Textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="bg-secondary/60" />
                <Button type="submit" className="w-full font-heading font-semibold">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Contact;
