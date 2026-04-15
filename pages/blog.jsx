import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Link from 'next/link'
import { Search, Calendar, User, MessageSquare, ArrowRight, ChevronRight, Grid } from 'lucide-react'

const BLOG_POSTS = [
  {
    slug: "money-saving-tips-accra",
    title: "Money-Saving Tips for Car Rentals in Accra",
    excerpt: "Renting a car in Accra doesn’t have to cost a fortune. Use these hacks to save big and enjoy the city on your terms.",
    content: "Book Online in Advance: Up to 20% cheaper than walk-ins. Avoid Airport Rentals: Higher fees—opt for city pickup. Fuel Policy: Choose 'full-to-full' to avoid refueling charges. Weekly Discounts: Rent for 7+ days for lower rates.",
    date: "November 17, 2025",
    author: "atlasrent",
    category: "Tips",
    comments: 0,
    likes: 0,
    img: "https://images.unsplash.com/photo-1542362567-b054cd1321c1?q=80&w=1200"
  },
  {
    slug: "scenic-road-trips-accra",
    title: "5 Scenic Road Trips from Accra You Can’t Miss",
    excerpt: "Accra is just the starting point! With a rental car, Ghana’s breathtaking landscapes are yours to explore.",
    content: "Accra is just the starting point! With a rental car, Ghana’s breathtaking landscapes are yours to explore. Here are 5 unforgettable road trips under 5 hours from the city including Cape Coast and more.",
    date: "May 13, 2016",
    author: "atlasrent",
    category: "Uncategorized",
    comments: 0,
    likes: 0,
    img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200"
  },
  {
    slug: "choose-right-car-accra",
    title: "How to Choose the Right Rental Car for Accra’s Roads",
    excerpt: "Accra’s mix of city traffic and rural roads demands the right wheels. Here’s how to pick your perfect match.",
    content: "First-time renters and cautious drivers. Accra’s mix of city traffic and rural roads demands the right wheels. Here’s how to pick your perfect rental car for Osu, East Legon and beyond.",
    date: "December 16, 2015",
    author: "atlasrent",
    category: "Uncategorized",
    comments: 0,
    likes: 0,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200"
  },
  {
    slug: "car-rental-insurance-ghana",
    title: "Car Rental Insurance in Ghana: What’s Covered & Not",
    excerpt: "Don’t let insurance confusion ruin your trip! Here’s a clear guide to rental car coverage in Ghana.",
    content: "Collision Damage Waiver (CDW): Covers repairs if you scratch the car. Theft Protection: Essential for peace of mind. Check your excess fee before signing!",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "Car Service",
    comments: 0,
    likes: -54,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
  },
  {
    slug: "renting-car-vs-bolt-accra",
    title: "Why Renting a Car Beats Bolt/Uber in Accra",
    excerpt: "Ride-hailing apps are convenient, but here’s why a rental car is smarter for exploring Accra.",
    content: "Cost Comparison: Bolt from Airport to Osu: ~₵150 (one-way). Daily Rental: ~₵300 (unlimited miles). Freedom to go anywhere without waiting.",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "News",
    comments: 0,
    likes: 0,
    img: "https://images.unsplash.com/photo-1549443105-324e5db301f9?q=80&w=1200"
  },
  {
    slug: "post-gallery",
    title: "Explore Our Post Gallery",
    excerpt: "Discover a wide range of rental vehicles tailored to meet your travel needs through our visual showcase.",
    content: "Welcome to our Post Gallery, where you can discover a wide range of rental vehicles tailored to meet your travel needs. Whether you’re looking for luxury or utility.",
    date: "October 17, 2015",
    author: "atlasrent",
    category: "Uncategorized",
    comments: 0,
    likes: 0,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200"
  }
]


export default function BlogPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Layout>
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        
        {/* Header Section */}
        <section style={{ padding: isMobile ? '120px 24px 60px' : '160px 64px 80px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: 40, marginBottom: 48 }}>
              <div style={{ width: 4, height: 80, background: 'var(--accent-gold)', display: isMobile ? 'none' : 'block' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 16 }}>The Atlas Journal</div>
                <h1 style={{ fontSize: isMobile ? 36 : 64, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Insights for The <br/> <span style={{ color: 'var(--accent-gold)' }}>Modern Traveler</span>.
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 64px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2.5fr 1fr', gap: 80 }}>
            
            {/* Main Feed */}
            <div style={{ display: 'grid', gap: 80 }}>
              {BLOG_POSTS.map((post, i) => (
                <motion.article 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ display: 'grid', gap: 32 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div style={{ 
                      height: isMobile ? 250 : 450, 
                      borderRadius: 32, 
                      overflow: 'hidden', 
                      background: '#f1f5f9',
                      position: 'relative',
                      cursor: 'pointer'
                    }}>
                      <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 32, left: 32, padding: '8px 16px', background: 'var(--accent-gold)', color: '#fff', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', borderRadius: 999 }}>
                        {post.category}
                      </div>
                    </div>
                  </Link>
                  
                  <div>
                    <div style={{ display: 'flex', gap: 24, marginBottom: 16, color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={14} /> {post.date}</span>
                       <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={14} /> {post.author}</span>
                       <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MessageSquare size={14} /> {post.comments} Comments</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: 'var(--accent)', marginBottom: 20, lineHeight: 1.2, cursor: 'pointer' }}>{post.title}</h2>
                    </Link>
                    <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>{post.excerpt}</p>
                    <div style={{ padding: 24, borderLeft: '3px solid var(--accent-gold)', background: '#f8fafc', marginBottom: 32 }}>
                       <p style={{ fontSize: 16, color: 'var(--accent)', fontStyle: 'italic', margin: 0, lineHeight: 1.7 }}>{post.content}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 800, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Read Continued <ArrowRight size={18} color="var(--accent-gold)" />
                      </button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <aside>
               <div style={{ position: 'sticky', top: 120, display: 'grid', gap: 60 }}>
                  
                  {/* Search */}
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: 'var(--accent)' }}>Search</h4>
                    <div style={{ position: 'relative' }}>
                       <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                       <input 
                         type="text" 
                         placeholder="Type here..."
                         style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14 }}
                       />
                    </div>
                  </div>

                  {/* Recent Posts List */}
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: 'var(--accent)' }}>Recent Posts</h4>
                    <div style={{ display: 'grid', gap: 20 }}>
                      {BLOG_POSTS.slice(0, 5).map((p, i) => (
                        <Link key={i} href={`/blog/${p.slug}`}>
                          <div style={{ display: 'flex', gap: 12, cursor: 'pointer' }}>
                             <ChevronRight size={16} color="var(--accent-gold)" style={{ marginTop: 2 }} />
                             <span className="hover-gold" style={{ fontSize: 14, color: '#64748b', fontWeight: 600, lineHeight: 1.4, transition: 'color 0.3s' }}>{p.title}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Post Gallery Placeholder */}
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: 'var(--accent)' }}>Post Gallery</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                       {[1,2,3,4,5,6].map(n => (
                         <div key={n} style={{ aspectRatio: '1/1', background: '#f1f5f9', borderRadius: 8, overflow: 'hidden' }}>
                            <img src={`https://images.unsplash.com/photo-1549443105-324e5db301f9?q=80&w=200&sig=${n}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Recent Comments */}
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, color: 'var(--accent)' }}>Recent Comments</h4>
                    <p style={{ fontSize: 14, color: '#94a3b8', fontStyle: 'italic' }}>No comments to show.</p>
                  </div>

               </div>
            </aside>

          </div>
        </section>

      </div>
    </Layout>
  )
}
