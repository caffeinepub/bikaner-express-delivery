import { Card, CardContent } from '@/components/ui/card';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <Card key={step.number} className="relative overflow-hidden">
          <div className="absolute right-4 top-4 text-6xl font-bold text-primary/10">
            {step.number}
          </div>
          <CardContent className="relative pt-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              {step.number}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
