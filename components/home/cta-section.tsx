import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Join thousands of patients who trust us with their healthcare. 
            Book your first appointment today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-blue-200">
            No credit card required • Free to join • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
