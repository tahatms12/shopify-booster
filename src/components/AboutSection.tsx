import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Award, Truck, Shield, Headphones } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully curated products that meet our high standards for excellence and durability."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50 with express delivery options available."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with industry-leading security and encryption technologies."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated customer service team is here to help you around the clock."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Store?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're more than just an online store. We're your partners in finding the perfect products 
              that enhance your lifestyle. With years of experience and thousands of satisfied customers, 
              we've built a reputation for excellence that speaks for itself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
                Learn More About Us
              </Button>
              <Button variant="outline" size="lg">
                Read Customer Reviews
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-brand-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;