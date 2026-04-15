import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, MessageSquare, Facebook, Twitter, Linkedin, Send } from 'lucide-react'

export default function ArticlePage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [commentForm, setCommentForm] = useState({ author: '', email: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    
    if (slug) {
      fetchData()
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [slug])

  const fetchData = async () => {
    try {
      // Fetch all posts and find the one with matching slug
      const pRes = await fetch('/api/news')
      const posts = await pRes.json()
      const currentPost = posts.find(p => (p.slug === slug) || (String(p.id) === String(slug)));
      
      if (currentPost) {
        setPost(currentPost)
        // Fetch comments for this post
        const cRes = await fetch(`/api/comments?postId=${currentPost.id}`)
        const commentsData = await cRes.json()
        setComments(Array.isArray(commentsData) ? commentsData : [])
      }
    } catch (err) {
      console.error("Failed to load article", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!post) return
    setSubmitting(true)
    
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          ...commentForm
        })
      })
      
      if (res.ok) {
        const newComment = await res.json()
        setComments(prev => [newComment, ...prev])
        setCommentForm({ author: '', email: '', content: '' })
      }
    } catch (err) {
      console.error("Comment submission failed", err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '160px 64px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8' }}>Archiving content...</p>
        </div>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <div style={{ padding: '160px 64px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900 }}>Article Not Found</h2>
          <Link href="/blog">
            <button style={{ marginTop: 24, padding: '12px 32px', background: 'var(--accent)', color: '#fff', borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer' }}>
              Back to Journal
            </button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        
        {/* Article Header */}
        <section style={{ padding: isMobile ? '120px 24px 60px' : '160px 64px 80px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Link href="/blog">
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 800, cursor: 'pointer', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 32 }}>
                <ArrowLeft size={16} /> Back to Journal
              </button>
            </Link>
            <h1 style={{ fontSize: isMobile ? 32 : 56, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 32 }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, color: '#94a3b8', fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={14} /> {post.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={14} /> {post.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MessageSquare size={14} /> {comments.length} Comments</span>
            </div>
          </div>
        </section>

        {/* Feature Image */}
        {(post.image || post.img) && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 24px' : '0 64px', marginTop: -40 }}>
             <div style={{ height: isMobile ? 300 : 600, borderRadius: 32, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
                <img src={post.image || post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          </div>
        )}

        {/* Article Content */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 64px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: 80 }}>
            
            {/* Body */}
            <div>
               <div style={{ fontSize: 18, color: '#64748b', lineHeight: 2, whiteSpace: 'pre-line', marginBottom: 80 }}>
                  {post.content || post.excerpt}
               </div>

               {/* Comments Section */}
               <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 80 }}>
                  <h3 style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)', marginBottom: 40 }}>Leave a Reply</h3>
                  <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 32 }}>Your email address will not be published. Required fields are marked *</p>
                  
                  <form onSubmit={handleCommentSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                     <div style={{ gridColumn: 'span 2' }}>
                        <textarea 
                          required
                          value={commentForm.content}
                          onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                          placeholder="Your Comment*" 
                          rows={8} 
                          style={{ width: '100%', padding: '20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: 15 }}
                        ></textarea>
                     </div>
                     <input 
                       required
                       type="text" 
                       placeholder="Full Name*" 
                       value={commentForm.author}
                       onChange={(e) => setCommentForm({...commentForm, author: e.target.value})}
                       style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} 
                     />
                     <input 
                       required
                       type="email" 
                       placeholder="Email Address*" 
                       value={commentForm.email}
                       onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                       style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} 
                     />
                     <div style={{ gridColumn: 'span 2' }}>
                        <button 
                          disabled={submitting}
                          type="submit"
                          style={{ padding: '18px 48px', background: 'var(--accent)', color: '#fff', borderRadius: 999, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 14, transition: 'transform 0.2s', opacity: submitting ? 0.7 : 1 }}>
                           {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                     </div>
                  </form>

                  <div style={{ marginTop: 80 }}>
                     <h4 style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent)', marginBottom: 40 }}>{comments.length} Comments</h4>
                     <div style={{ display: 'grid', gap: 40 }}>
                        {comments.length === 0 ? (
                           <div style={{ padding: 40, border: '1px dashed #e2e8f0', borderRadius: 24, textAlign: 'center' }}>
                              <MessageSquare size={32} color="#94a3b8" style={{ marginBottom: 16, opacity: 0.5 }} />
                              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>Be the first to share your thoughts!</p>
                           </div>
                        ) : (
                           comments.map((c, i) => (
                              <div key={c.id || i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 32 }}>
                                 <div style={{ fontWeight: 900, color: 'var(--accent)', marginBottom: 8, fontSize: 16 }}>{c.author}</div>
                                 <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, fontWeight: 700 }}>{new Date(c.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                 <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{c.content}</p>
                              </div>
                           ))
                        )}
                     </div>
                  </div>
               </div>

            </div>

            {/* Meta Sidebar */}
            <aside>
               <div style={{ position: 'sticky', top: 120, display: 'grid', gap: 48 }}>
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: 16 }}>Published By</h4>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>{post.author}</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: 16 }}>Category</h4>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>{post.category}</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', marginBottom: 16 }}>Share This</h4>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <Facebook size={20} style={{ cursor: 'pointer' }} color="var(--accent)" />
                      <Twitter size={20} style={{ cursor: 'pointer' }} color="var(--accent)" />
                      <Linkedin size={20} style={{ cursor: 'pointer' }} color="var(--accent)" />
                    </div>
                  </div>
                  <div style={{ marginTop: 40, padding: 32, background: 'var(--accent)', borderRadius: 24, color: '#fff' }}>
                     <h4 style={{ fontSize: 20, fontWeight: 900, marginBottom: 16 }}>Ready to Go?</h4>
                     <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>Book one of our elite vehicles for your next trip.</p>
                     <Link href="/vehicles">
                        <button style={{ width: '100%', padding: '12px', background: 'var(--accent-gold)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                           Explore Fleet
                        </button>
                     </Link>
                  </div>
               </div>
            </aside>

          </div>
        </section>

      </div>
    </Layout>
  )
}
