import { useState } from 'react';
import { Star } from 'lucide-react';
import { getReviews, addReview, type Review } from '@/data/store';

interface Props {
  productId: number;
  productRating: number;
  productReviewCount: number;
}

const ProductReviews = ({ productId, productRating, productReviewCount }: Props) => {
  const [reviews, setReviews] = useState<Review[]>(getReviews(productId));
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submit = () => {
    if (!name.trim() || !comment.trim()) return;
    addReview({ productId, name, rating, comment });
    setReviews(getReviews(productId));
    setName(''); setComment(''); setRating(5); setShowForm(false);
  };

  const Stars = ({ count, size = 12 }: { count: number; size?: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= count ? 'text-accent fill-accent' : 'text-muted-foreground'} />
      ))}
    </div>
  );

  return (
    <div className="mt-6">
      <h3 className="font-script text-lg font-bold mb-3">Reviews</h3>

      {/* Rating summary */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">{productRating}</p>
          <Stars count={Math.round(productRating)} size={14} />
          <p className="text-[10px] text-muted-foreground mt-0.5">{productReviewCount} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(star => {
            const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[10px] w-3">{star}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User reviews */}
      {reviews.length > 0 && (
        <div className="space-y-3 mb-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-secondary rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold">{r.name}</span>
                <span className="text-[10px] text-muted-foreground">{r.date}</span>
              </div>
              <Stars count={r.rating} />
              <p className="text-xs text-muted-foreground mt-1.5">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add review */}
      {showForm ? (
        <div className="bg-secondary rounded-lg p-3 space-y-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} onClick={() => setRating(i)}>
                  <Star size={18} className={i <= rating ? 'text-accent fill-accent' : 'text-muted-foreground'} />
                </button>
              ))}
            </div>
          </div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your review..." rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card resize-none" />
          <div className="flex gap-2">
            <button onClick={submit} className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-lg">Submit</button>
            <button onClick={() => setShowForm(false)} className="text-xs text-muted-foreground px-4 py-2">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="w-full border border-primary text-primary text-xs font-bold py-2.5 rounded-lg">
          Write a Review
        </button>
      )}
    </div>
  );
};

export default ProductReviews;
