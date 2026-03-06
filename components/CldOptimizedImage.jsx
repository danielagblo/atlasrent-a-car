import React from 'react'
import { CldImage, getCldImageUrl as nextGetCldImageUrl } from 'next-cloudinary'

/**
 * Standard utility to parse URLs or local paths into Cloudinary public IDs.
 */
export const getCldPublicId = (url) => {
    if (!url) return 'ekgsite/assets/hero'
    if (typeof url !== 'string') return 'ekgsite/assets/hero'

    if (url.includes('cloudinary.com')) {
        const parts = url.split('/')
        const uploadIdx = parts.indexOf('upload')
        if (uploadIdx !== -1) {
            // Find where version starts (usually starts with v followed by numbers)
            const versionMatch = parts.findIndex(p => /^v\d+/.test(p))
            if (versionMatch !== -1 && versionMatch < parts.length - 1) {
                return parts.slice(versionMatch + 1).join('/').split('.')[0]
            }
            return parts.slice(uploadIdx + 2).join('/').split('.')[0]
        }
    }

    // Local paths migration
    if (url.includes('/uploads/')) {
        const filename = url.split('/uploads/')[1]
        return `ekgsite/uploads/${filename.split('.')[0]}`
    }
    if (url.startsWith('/assets/')) {
        const filename = url.split('/assets/')[1]
        return `ekgsite/assets/${filename.split('.')[0]}`
    }

    // Direct public IDs (e.g. 'ekgsite/assets/hero')
    if (url.startsWith('ekgsite/')) return url

    return url
}

/**
 * Utility to get an optimized Cloudinary URL for CSS backgrounds or other non-component uses.
 */
export const getCldImageUrl = (src, options = {}) => {
    const publicId = getCldPublicId(src)
    const isCld = !publicId.startsWith('http') && !publicId.startsWith('/') && !publicId.startsWith('data:')

    if (!isCld) return publicId

    return nextGetCldImageUrl({
        src: publicId,
        width: options.width || 1920,
        height: options.height || 1080,
        crop: options.crop || 'fill',
        quality: options.quality || 'auto',
        ...options
    })
}

/**
 * Component that safely renders a Cloudinary image or a standard img tag for non-Cld URLs.
 */
export default function CldOptimizedImage({ src, alt, width, height, crop = 'fill', className, style, ...props }) {
    const publicId = getCldPublicId(src)
    const isCld = !publicId.startsWith('http') && !publicId.startsWith('/') && !publicId.startsWith('data:')

    if (!isCld) {
        return <img src={publicId} alt={alt} className={className} style={{ ...style, width: width || 'auto', height: height || 'auto' }} {...props} />
    }

    return (
        <CldImage
            width={width || 800}
            height={height || 600}
            src={publicId}
            alt={alt || ''}
            crop={crop}
            className={className}
            style={style}
            {...props}
        />
    )
}
