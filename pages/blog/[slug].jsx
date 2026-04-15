import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { Calendar, User, MessageSquare, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

const BLOG_POSTS = [
  {
    slug: "money-saving-tips-accra",
    title: "Money-Saving Tips for Car Rentals in Accra",
    excerpt: "Renting a car in Accra doesn’t have to cost a fortune. Use these hacks to save big and enjoy the city on your terms.",
    content: "Renting a car in Accra doesn’t have to cost a fortune. Use these hacks to save big!\n\nTips:\n\n1. Book Online in Advance: Up to 20% cheaper than walk-ins.\n2. Avoid Airport Rentals: Higher fees—opt for city pickup.\n3. Fuel Policy: Choose “full-to-full” to avoid refueling charges.\n4. Weekly Discounts: Rent for 7+ days for lower rates.\n\nReady to save? Check our current deals!",
    date: "November 17, 2025",
    author: "atlasrent",
    category: "Tips",
    img: "https://images.unsplash.com/photo-1542362567-b054cd1321c1?q=80&w=1200"
  },
  {
    slug: "scenic-road-trips-accra",
    title: "5 Scenic Road Trips from Accra You Can’t Miss",
    excerpt: "Accra is just the starting point! With a rental car, Ghana’s breathtaking landscapes are yours to explore.",
    content: "Accra is just the starting point! With a rental car, Ghana’s breathtaking landscapes are yours to explore. Here are 5 unforgettable road trips under 5 hours from the city.\n\n1. Cape Coast: Visit the historic castles and canopy walks.\n2. Akosombo: Enjoy the majesty of the Volta River.\n3. Aburi Gardens: Cool mountain air and botanical wonders.\n4. Shai Hills: Wildlife and rocky adventures.\n5. Ada Foah: Where the river meets the sea.",
    date: "May 13, 2016",
    author: "atlasrent",
    category: "Uncategorized",
    img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200"
  },
  {
    slug: "choose-right-car-accra",
    title: "How to Choose the Right Rental Car for Accra’s Roads",
    excerpt: "Accra’s mix of city traffic and rural roads demands the right wheels. Here’s how to pick your perfect match.",
    content: "First-time renters and cautious drivers. Accra’s mix of city traffic and rural roads demands the right wheels. Here’s how to pick your perfect rental car.\n\nFor City Driving (e.g., Osu, East Legon): Compact sedans are great for parking and fuel efficiency.\nFor Long Trips/Offroad: SUVs or 4x4s are essential for comfort and safety.\nFor Groups: Our spacious vans ensure everyone travels together in style.",
    date: "December 16, 2015",
    author: "atlasrent",
    category: "Uncategorized",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200"
  },
  {
    slug: "car-rental-insurance-ghana",
    title: "Car Rental Insurance in Ghana: What’s Covered & Not",
    excerpt: "Don’t let insurance confusion ruin your trip! Here’s a clear guide to rental car coverage in Ghana.",
    content: "Don’t let insurance confusion ruin your trip! Here’s a clear guide to rental car coverage in Ghana.\n\nCollision Damage Waiver (CDW): Covers repairs if you scratch the car (but check the excess fee!).\nTheft Protection: Covers the vehicle in case of theft.\nThird Party Liability: Standard coverage for other people and property involved in an accident.\n\nAlways read your agreement closely before signing!",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "Car Service",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
  },
  {
    slug: "renting-car-vs-bolt-accra",
    title: "Why Renting a Car Beats Bolt/Uber in Accra",
    excerpt: "Ride-hailing apps are convenient, but here’s why a rental car is smarter for exploring Accra.",
    content: "Ride-hailing apps are convenient, but here’s why a rental car is smarter for exploring Accra.\n\nCost Comparison:\nBolt from Airport to Osu: ~₵150 (one-way).\nDaily Rental: ~₵300 (unlimited miles).\n\nFreedom: Go anywhere, anytime, without waiting for a driver or dealing with surge pricing.",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "News",
    img: "https://images.unsplash.com/photo-1549443105-324e5db301f9?q=80&w=1200"
  },
  {
    slug: "post-gallery",
    title: "Explore Our Post Gallery",
    excerpt: "Discover a wide range of rental vehicles tailored to meet your travel needs through our visual showcase.",
    content: "Welcome to our Post Gallery, where you can discover a wide range of rental vehicles tailored to meet your travel needs. Whether you’re looking for luxury sedans, rugged SUVs, or practical family vans, our fleet is ready to serve you.\n\nBrowse through our collection and find the perfect vehicle for your next journey in Ghana.",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "Uncategorized",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200"
  }
]

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    if (slug) {
      const found = BLOG_POSTS.find(p => p.slug === slug)
      setPost(found)
    }
  }, [slug])

  if (!post) return null

  return (
    <Layout>
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        
        {/* Post Hero */}
        <section style={{ 
          height: isMobile ? '50vh' : '70vh', 
          position: 'relative', 
          overflow: 'hidden',
          background: '#0a0a0c'
        }}>
          <img src={post.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt={post.title} />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(10,10,12,1) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: isMobile ? '40px 24px' : '80px 64px'
          }}>
            <div style={{ maxWidth: 1000 }}>
               <Link href="/blog">
                 <button style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-gold)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', marginBottom: 24, padding: 0 }}>
                   <ArrowLeft size={16} /> Back to Journal
                 </button>
               </Link>
               <div style={{ padding: '6px 16px', background: 'var(--accent-gold)', color: '#fff', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', borderRadius: 999, display: 'inline-block', marginBottom: 20 }}>
                  {post.category}
               </div>
               <h1 style={{ fontSize: isMobile ? 32 : 64, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>
                 {post.title}
               </h1>
            </div>
          </div>
        </section>

        {/* Post Content */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 64px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 3fr', gap: 60 }}>
            
            {/* Meta Sidebar */}
            <aside style={{ borderRight: isMobile ? 'none' : '1px solid #f1f5f9', paddingRight: isMobile ? 0 : 40 }}>
               <div style={{ display: 'grid', gap: 40, position: 'sticky', top: 120 }}>
                  
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Written By</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                       <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-gold)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>A</div>
                       <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>{post.author}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Published On</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>{post.date}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Share Article</div>
                    <div style={{ display: 'flex', gap: 16 }}>
                       <Facebook size={20} color="var(--accent)" style={{ cursor: 'pointer' }} />
                       <Twitter size={20} color="var(--accent)" style={{ cursor: 'pointer' }} />
                       <Linkedin size={20} color="var(--accent)" style={{ cursor: 'pointer' }} />
                    </div>
                  </div>

               </div>
            </aside>

            {/* Article Body */}
            <div>
               <div style={{ fontSize: 18, color: '#64748b', lineHeight: 2, whiteSpace: 'pre-line', marginBottom: 80 }}>
                  {post.content}
               </div>

               {/* Comments Section */}
               <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 80 }}>
                  <h3 style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)', marginBottom: 40 }}>Leave a Reply</h3>
                  <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 32 }}>Your email address will not be published. Required fields are marked *</p>
                  
                  <form style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                     <div style={{ gridColumn: 'span 2' }}>
                        <textarea placeholder="Your Comment*" rows={8} style={{ width: '100%', padding: '20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: 15 }}></textarea>
                     </div>
                     <input type="text" placeholder="Full Name*" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                     <input type="email" placeholder="Email Address*" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                     <div style={{ gridColumn: 'span 2' }}>
                        <button style={{ padding: '18px 48px', background: 'var(--accent)', color: '#fff', borderRadius: 999, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 14, transition: 'transform 0.2s' }}>
                           Post Comment
                        </button>
                     </div>
                  </form>

                  <div style={{ marginTop: 80, padding: 40, border: '1px dashed #e2e8f0', borderRadius: 24, textAlign: 'center' }}>
                     <MessageSquare size={32} color="#94a3b8" style={{ marginBottom: 16, opacity: 0.5 }} />
                     <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>No comments yet. Be the first to start the conversation!</p>
                  </div>
               </div>

               <div style={{ marginTop: 80, padding: 60, background: '#f8fafc', borderRadius: 32, textAlign: 'center' }}>
                  <h3 style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)', marginBottom: 16 }}>Ready for your own journey?</h3>
                  <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32 }}>Book a premium vehicle today and explore Ghana with Atlas.</p>
                  <Link href="/products">
                    <button style={{ padding: '16px 40px', background: 'var(--accent)', color: '#fff', borderRadius: 999, border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                      Browse Fleet
                    </button>
                  </Link>
               </div>
            </div>

          </div>
        </section>

      </div>
    </Layout>
  )
}
