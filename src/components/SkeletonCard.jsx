import '../styles/SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-info">
        <div className="skeleton-line long" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
}

export default SkeletonCard;