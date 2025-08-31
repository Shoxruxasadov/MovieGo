export function Quality(resolution: string): string {
    switch (resolution) {
      case '2160p':
        return '4K';
      case '1080p':
        return 'FHD';
      case '720p':
        return 'HD';
      case '480p':
        return 'SD';
      default:
        return resolution;
    }
  }