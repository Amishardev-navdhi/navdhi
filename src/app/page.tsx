import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Bot,
  Leaf,
  Apple,
  Smartphone,
  Mail,
  MapPin,
} from 'lucide-react';
import AiDietTool from '@/components/ai-diet-tool';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section
          id="home"
          className="relative h-[100vh] w-full flex items-center justify-center text-center"
        >
          <Image
            src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/Black%20and%20White%20Minimal%20and%20Typographic%20Mountain%20Landscape%20Desktop%20Wallpaper.png"
            alt="Hero background"
            data-ai-hint="mountain landscape"
            fill
            className="object-cover object-center absolute inset-0 z-0"
            
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 container px-4 md:px-6 text-white">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Navdhi: The Essence of Innovation
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Fusing ancient wisdom with modern science to nurture your well-being.
              </p>
              <div>
                <Button size="lg" asChild>
                  <a href="#products">Explore Our Products</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Story: A Journey of Purity and Passion
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Navdhi began with a mission to blend nature’s wisdom with cutting-edge wellness. We offer nutrient-rich diet products and healing herbal teas rooted in Ayurveda. Our Dietary Guide app empowers users with personalized nutrition insights, tracking, and holistic guidance. Every product and tool we create reflects our passion for purity, health, and mindful living — naturally and sustainably.
                </p>
              </div>
              <div className="w-full h-80 flex items-center justify-center relative rounded-lg overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/nav%C2%B7dhi.png"
                  alt="Navdhi Logo"
                  data-ai-hint="logo"
                  width={400}
                  height={200}
                  className="object-contain"
                  
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />
        
        <section id="team" className="py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <p className="text-primary font-semibold">People behind Navdhi</p>
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Team
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12 justify-center">
              <Card className="max-w-sm mx-auto shadow-lg border-0 overflow-hidden text-center">
                <CardContent className="p-0">
                  <div className="bg-[#F0F7F0]">
                    <Image
                      src="https://github.com/amishardev/navdhiweb/blob/main/Screenshot%202025-09-11%20004854.png?raw=true"
                      alt="Nishi Sharma"
                      data-ai-hint="woman portrait"
                      width={400}
                      height={400}
                      className="object-cover w-full h-auto"
                      
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">Nishi Sharma</h3>
                    <p className="text-primary font-semibold">Managing Director</p>
                    <p className="text-muted-foreground text-sm">Dietitian | 22+ Years of Experience</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="max-w-sm mx-auto shadow-lg border-0 overflow-hidden text-center">
                <CardContent className="p-0">
                  <div className="bg-[#F0F7F0]">
                    <Image
                      src="https://github.com/amishardev/navdhiweb/blob/main/Screenshot%202025-09-11%20004844.png?raw=true"
                      alt="Amish Sharma"
                      data-ai-hint="man portrait"
                      width={400}
                      height={400}
                      className="object-cover w-full h-auto"
                      
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">Amish Sharma</h3>
                    <p className="text-primary font-semibold">Co-Founder</p>
                    <p className="text-muted-foreground text-sm">IIM Sambalpur | student</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        <section id="products" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Products & Services
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Carefully crafted, scientifically formulated, and ethically
                sourced for your holistic health.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <CardHeader>
                  <div className="w-full h-56 relative rounded-t-lg overflow-hidden">
                    <Image
                      src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/9a52e98e-9fa4-436a-afdc-79247e5e6da3.jpg"
                      alt="Healthy Diet Snacks"
                      data-ai-hint="healthy snacks"
                      fill
                      className="object-cover"
                      
                    />
                  </div>
                  <CardTitle className="pt-4 font-headline">
                    Healthy Diet Snacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Deliciously guilt-free snacks packed with nutrients to fuel
                    your day, the healthy way.
                  </p>
                </CardContent>
              </Card>
              <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <CardHeader>
                  <div className="w-full h-56 relative rounded-t-lg overflow-hidden">
                    <Image
                      src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/Peach%20Website%20Launch%20Instagram%20Post.png"
                      alt="Dietary Guide App"
                      data-ai-hint="app launch"
                      fill
                      className="object-cover"
                      
                    />
                  </div>
                  <CardTitle className="pt-4 font-headline">
                    Dietary Guide App
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Personalized nutrition insights, tracking, and holistic guidance at your fingertips.
                  </p>
                </CardContent>
              </Card>
              <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
                <CardHeader>
                  <div className="w-full h-56 relative rounded-t-lg overflow-hidden">
                    <Image
                      src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/9a52e98e-9fa4-436a-afdc-79247e5e6da3.jpg"
                      alt="Herbal Teas"
                      data-ai-hint="herbal tea"
                      fill
                      className="object-cover"
                      
                    />
                  </div>
                  <CardTitle className="pt-4 font-headline">Herbal Teas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Soothe your senses and boost your immunity with our curated
                    blends of aromatic herbal teas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        <section id="innovation" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Innovation Lab
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Where nature&apos;s wisdom meets cutting-edge science to create
                products that are pure, potent, and proven.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  Smart Nutrition Engine
                </h3>
                <p className="text-muted-foreground mt-2">
                  Our AI-driven app decodes your lifestyle and health goals to tailor personalized diet recommendations instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  Functional Herbal Teas
                </h3>
                <p className="text-muted-foreground mt-2">
                  Blended by experts and backed by research, our teas target energy, digestion, stress, and immunity — naturally.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Apple className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  Healthy Snacking, Reimagined
                </h3>
                <p className="text-muted-foreground mt-2">
                  Our diet snacks are curated for taste and transformation — guilt-free, nutrient-packed, and goal-oriented.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">
                  Personalized Wellness Tech
                </h3>
                <p className="text-muted-foreground mt-2">
                  From predictive meal planning to real-time nutrition tips, our ecosystem evolves with your health journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section
          id="latest"
          className="py-12 md:py-24 lg:py-32 bg-secondary/50"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Latest by Navdhi
              </h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Stay updated with our latest innovations and wellness news,
                straight from the Navdhi lab.
              </p>
            </div>
            <div className="mt-12 flex justify-center">
              <Card className="overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 md:max-w-md lg:max-w-lg">
                <Image
                  src="https://raw.githubusercontent.com/amishardev/navdhiweb/main/Peach%20Website%20Launch%20Instagram%20Post.png"
                  alt="Navdhi Dietary Guide App"
                  data-ai-hint="wellness app"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  
                />
                <CardHeader>
                  <CardTitle className="font-headline">
                    Launching Soon: The Navdhi Dietary Guide App
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your personalized path to wellness is just a tap away.
                    Discover tailored nutrition insights, track your goals, and
                    embrace a healthier lifestyle with our new app.
                  </CardDescription>
                  <Button variant="link" className="px-0 pt-4">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        <section id="connect" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                🔗 Connect With Us
              </h2>
              <p className="font-headline text-2xl text-primary">
                Your Wellness Journey Starts Here
              </p>
              <div className="max-w-3xl mx-auto text-muted-foreground md:text-lg/relaxed space-y-4">
                <p>
                  Have a question, idea, or specific health concern? At NAVDHI
                  SOLUTIONS, we believe wellness should be personal,
                  intentional, and informed by nature and science. Whether
                  you&apos;re exploring healthy living, facing dietary
                  restrictions, or simply curious about our innovations — feel
                  free to share. Your inputs not only help us guide you better
                  but also inspire the research and innovation we do at Navdhi.
                </p>
                <p className="font-semibold">
                  💬 Drop your thoughts, questions, or wellness goals below —
                  Let’s build the future of health, together.
                </p>
              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <AiDietTool />
            </div>
          </div>
        </section>

        <Separator />

        <section id="contact" className="py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get In Touch
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  We&apos;re here to help and answer any question you might
                  have. We look forward to hearing from you!
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>IIT Kanpur, Kalyanpur, Kanpur, Uttar Pradesh 208016</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contact@navdhi.com</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=26.511383,80.234931&z=17&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
