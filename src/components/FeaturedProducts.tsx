import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, Star } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 89,
      badge: "New"
    },
    {
      id: 3,
      name: "Minimalist Backpack",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 56,
      badge: "Sale"
    },
    {
      id: 4,
      name: "Eco-Friendly Water Bottle",
      price: 29,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 203,
      badge: "Eco"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-card">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={product.badge === "Sale" ? "destructive" : "secondary"}
                      className="bg-white/90 text-foreground"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-brand-secondary text-brand-secondary" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;