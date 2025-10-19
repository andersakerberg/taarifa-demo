'use client';

import { VERSION } from '@/lib/version';

interface VersionBadgeProps {
  className?: string;
  showFull?: boolean;
}

export default function VersionBadge({ className = '', showFull = false }: VersionBadgeProps) {
  return (
    <div className={`version-badge ${className}`}>
      <span className="version-text">
        {showFull ? VERSION.full : VERSION.short}
      </span>
    </div>
  );
}
