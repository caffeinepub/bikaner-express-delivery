import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function FounderCard() {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover-lift">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg">
            {!imageError ? (
              <img
                src="/assets/1768716215296.jpg"
                alt="Sarwan Singh Rathore - Founder"
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <User className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold">Sarwan Singh Rathore</h3>
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              "At Bikaner Express Delivery, we believe in building trust through reliable service. Every delivery is a promise we keep to our customers. With years of experience in local logistics, we understand the importance of speed, safety, and transparency. Your trust is our greatest asset."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
