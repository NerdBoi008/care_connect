'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

export function ReviewsList({ 
  reviews, 
  doctorName 
}: { 
  reviews: Review[];
  doctorName: string;
}) {
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Patient Reviews</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">Based on {reviews.length} reviews</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="text-sm font-medium w-12">{rating} star</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 w-12 text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {review.patientName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {review.patientName}
                        {review.verified && (
                          <span className="text-xs text-green-600 ml-2">✓ Verified Patient</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(review.date), 'MMMM d, yyyy')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">No reviews yet</h3>
              <p className="text-sm">Be the first to review {doctorName}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
