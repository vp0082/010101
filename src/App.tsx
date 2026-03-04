import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Heart, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ChevronLeft, 
  Copy, 
  Check,
  Star,
  ArrowRight,
  Menu,
  MoreHorizontal,
  Video as VideoIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Post {
  id: number;
  type: 'image' | 'video';
  url: string;
  likes: number;
  comments: number;
  isLocked: boolean;
  caption: string;
  time: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

// --- Mock Data ---
const STORIES = [
  { id: 1, name: 'Seu Perfil', avatar: 'https://i.pravatar.cc/150?u=creator', isLive: true },
  { id: 2, name: 'Dani_Vip', avatar: 'https://i.pravatar.cc/150?u=stories1', isLive: false },
  { id: 3, name: 'Gabi_Hot', avatar: 'https://i.pravatar.cc/150?u=stories2', isLive: false },
  { id: 4, name: 'Madu_Ex', avatar: 'https://i.pravatar.cc/150?u=stories3', isLive: false },
  { id: 5, name: 'Bella_X', avatar: 'https://i.pravatar.cc/150?u=stories4', isLive: false },
  { id: 6, name: 'Lara_S', avatar: 'https://i.pravatar.cc/150?u=stories5', isLive: false },
];

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    type: 'image',
    url: 'https://picsum.photos/seed/post1/800/1000',
    likes: 1240,
    comments: 85,
    isLocked: false,
    caption: 'Bastidores do ensaio de hoje! ✨ O que acharam desse look?',
    time: '2 horas atrás'
  },
  {
    id: 2,
    type: 'image',
    url: 'https://picsum.photos/seed/post2/800/1000',
    likes: 3500,
    comments: 210,
    isLocked: true,
    caption: 'Conteúdo exclusivo para assinantes. Clique para ver o ensaio completo! 🔞',
    time: '5 horas atrás'
  },
  {
    id: 3,
    type: 'video',
    url: 'https://picsum.photos/seed/post3/800/1000',
    likes: 890,
    comments: 45,
    isLocked: true,
    caption: 'Vídeo novo disponível! Vem ver o que eu preparei pra você... 🔥',
    time: '1 dia atrás'
  },
  {
    id: 4,
    type: 'image',
    url: 'https://picsum.photos/seed/post4/800/1000',
    likes: 2100,
    comments: 120,
    isLocked: true,
    caption: 'Ensaio completo liberado na assinatura mensal. Não perde tempo!',
    time: '2 dias atrás'
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'João Silva', text: 'Melhor conteúdo que já assinei, vale cada centavo!', rating: 5, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Ricardo M.', text: 'A qualidade dos vídeos é impressionante.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Lucas G.', text: 'Sempre tem novidade, recomendo muito.', rating: 4, avatar: 'https://i.pravatar.cc/150?u=3' },
];

// --- Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-black italic shadow-[0_0_15px_rgba(16,185,129,0.3)]">P</div>
      <span className="font-black text-xl tracking-tighter italic bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">PRIVACY</span>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-400 hover:text-white">
        <Share2 className="w-5 h-5" />
      </button>
      <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-400 hover:text-white">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const CheckoutPage = ({ onBack }: { onBack: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [coupon, setCoupon] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [method, setMethod] = useState<'pix' | 'card'>('pix');
  const [step, setStep] = useState<'info' | 'payment'>('info');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyPix = () => {
    navigator.clipboard.writeText('00020126330014br.gov.bcb.pix011100000000000520400005303986540419.905802BR5913PrivacyClone6009SAO%20PAULO62070503***6304');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-zinc-950 text-white pb-20"
    >
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-all group">
          <div className="p-2 rounded-xl bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-black uppercase tracking-widest text-[10px]">Voltar ao perfil</span>
        </button>

        {step === 'info' ? (
          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full -mr-16 -mt-16" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight mb-1">Assinatura Premium</h2>
                  <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Acesso Vitalício enquanto durar a assinatura</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                  Melhor Preço
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black tracking-tighter">R$ 19,90</span>
                <span className="text-zinc-500 font-bold">/mês</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  'Acesso a +150 mídias exclusivas',
                  'Chat prioritário com a Julia',
                  'Conteúdo 4K Ultra HD',
                  'Lives exclusivas mensais'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-zinc-800/30 p-4 rounded-2xl border border-white/5 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Oferta por tempo limitado</p>
                  <p className="text-sm font-black text-amber-500 font-mono">Expira em {formatTime(timeLeft)}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <input 
                  type="text" 
                  placeholder="CUPOM DE DESCONTO"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-black border border-white/5 rounded-2xl px-6 py-4 text-xs font-black tracking-widest focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700 uppercase"
                />
                <button className="bg-zinc-800 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-all">Aplicar</button>
              </div>

              <button 
                onClick={() => setStep('payment')}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-[0_15px_40px_rgba(16,185,129,0.3)] active:scale-95"
              >
                PROSSEGUIR PARA PAGAMENTO
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, text: '7 Dias de Garantia' },
                { icon: Lock, text: 'Dados Criptografados' },
                { icon: CheckCircle2, text: 'Acesso Imediato' }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center gap-3">
                  <item.icon className="w-6 h-6 text-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-zinc-500 px-2">Depoimentos de Assinantes</h3>
              <div className="grid gap-4">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-5 flex gap-5">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shadow-xl" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm">{t.name}</span>
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed italic">"{t.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
            
            <div className="flex flex-col items-center mb-10">
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setMethod('pix')}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${method === 'pix' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'}`}
                >
                  PIX
                </button>
                <button 
                  onClick={() => setMethod('card')}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${method === 'card' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'}`}
                >
                  Cartão
                </button>
              </div>

              {method === 'pix' ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" alt="PIX" className="h-8" />
                    <span className="font-black text-2xl italic tracking-tighter">PAGAMENTO PIX</span>
                  </div>

                  <div className="bg-zinc-100 p-8 rounded-[2rem] mb-10 inline-block border-2 border-dashed border-zinc-200">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126330014br.gov.bcb.pix011100000000000520400005303986540419.905802BR5913PrivacyClone6009SAO%20PAULO62070503***6304" 
                      alt="QR Code PIX"
                      className="w-full max-w-[220px] mx-auto mix-blend-multiply"
                    />
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="text-[10px] text-zinc-400 uppercase font-black tracking-[0.3em]">Total a pagar</div>
                    <div className="text-5xl font-black tracking-tighter">R$ 19,90</div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={copyPix}
                      className="w-full bg-zinc-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl"
                    >
                      {isCopied ? <Check className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
                      {isCopied ? 'CÓDIGO COPIADO!' : 'COPIAR CÓDIGO PIX'}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Pagamento 100% Seguro</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full space-y-6 py-10">
                  <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-zinc-800 to-black rounded-2xl p-6 text-left text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-12 h-8 bg-zinc-700/50 rounded-md" />
                      <div className="font-black italic text-xl">VISA</div>
                    </div>
                    <div className="text-xl font-mono tracking-[0.3em] mb-8">**** **** **** ****</div>
                    <div className="flex justify-between items-end">
                      <div className="text-[10px] uppercase font-bold text-zinc-500">Card Holder</div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500">Exp Date</div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium">O pagamento via cartão está temporariamente indisponível. Por favor, utilize o **PIX** para liberação imediata.</p>
                  <button 
                    onClick={() => setMethod('pix')}
                    className="text-emerald-600 font-black uppercase text-[10px] tracking-widest hover:underline"
                  >
                    Voltar para o PIX
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setStep('info')}
              className="mt-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:text-black transition-colors"
            >
              Voltar para detalhes do plano
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const PostCard = ({ post, onUnlock }: { post: Post, onUnlock: () => void, key?: React.Key }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden mb-8 group"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-200 p-0.5">
            <img src="https://i.pravatar.cc/150?u=creator" alt="Creator" className="w-full h-full rounded-full object-cover border-2 border-black" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm hover:text-emerald-500 transition-colors cursor-pointer">@julia_official</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
            </div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{post.time}</span>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
        <img 
          src={post.url} 
          alt="Post content" 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${post.isLocked ? 'blur-3xl scale-125' : ''}`}
        />
        
        {post.isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-8 text-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl"
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-xl font-black mb-3 tracking-tight">CONTEÚDO BLOQUEADO</h3>
            <p className="text-sm text-zinc-400 mb-8 max-w-[240px] leading-relaxed">Este conteúdo é exclusivo para assinantes. Desbloqueie agora para ter acesso total.</p>
            <button 
              onClick={onUnlock}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-4 rounded-2xl text-sm uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95"
            >
              DESBLOQUEAR AGORA
            </button>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          {post.type === 'video' && (
            <div className="bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
              <VideoIcon className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="bg-emerald-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
            EXCLUSIVO
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-5 mb-5">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all ${liked ? 'text-rose-500 scale-110' : 'text-zinc-400 hover:text-white'}`}
          >
            <Heart className={`w-7 h-7 ${liked ? 'fill-rose-500' : ''}`} />
            <span className="text-sm font-black">{likesCount.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <MessageCircle className="w-7 h-7" />
            <span className="text-sm font-black">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors ml-auto">
            <Share2 className="w-7 h-7" />
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-zinc-200 leading-relaxed">
            <span className="font-black mr-2 text-white">julia_official</span>
            {post.caption}
          </p>
        </div>

        {/* Simulated Comments */}
        <div className="mt-5 pt-5 border-t border-white/5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-black">marcos_92</span>
                <span className="text-[10px] text-zinc-500">1h</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">Maravilhosa demais! 😍 Não vejo a hora de ver o ensaio completo.</p>
            </div>
          </div>
          <button className="text-[10px] text-emerald-500 font-black uppercase tracking-widest hover:text-emerald-400 transition-colors pl-11">
            Ver todos os {post.comments} comentários
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'profile' | 'checkout'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* Background Gradient Layer */}
      <div className="fixed inset-0 bg-gradient-premium pointer-events-none z-0" />
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'checkout' ? (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <CheckoutPage 
                onBack={() => setView('profile')} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Navbar />

              {/* Loading Overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Criptografando</span>
                      <span className="text-zinc-500 text-[9px] uppercase tracking-widest animate-pulse">Estabelecendo conexão segura...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <main className="max-w-2xl mx-auto pb-24">
                {/* Header / Profile */}
                <div className="relative">
                  <div className="h-56 bg-zinc-900 relative overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/cover/1200/600" 
                      alt="Cover" 
                      className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  
                  <div className="px-5 -mt-20 relative z-10">
                    <div className="flex items-end justify-between mb-8">
                      <div className="relative">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-36 h-36 rounded-[2.5rem] bg-black p-1.5 shadow-2xl"
                        >
                          <img 
                            src="https://i.pravatar.cc/300?u=creator" 
                            alt="Profile" 
                            className="w-full h-full rounded-[2rem] object-cover border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                          />
                        </motion.div>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-2 rounded-2xl border-4 border-black shadow-xl"
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                      </div>
                      
                      <div className="flex gap-3 mb-3">
                        <button className="glass p-3.5 rounded-2xl hover:bg-white/10 transition-all active:scale-90">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button className="glass p-3.5 rounded-2xl hover:bg-white/10 transition-all active:scale-90">
                          <Star className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-10">
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black tracking-tight">Julia Official</h1>
                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Verificada</span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                        Bem-vindos ao meu lado mais exclusivo! 🔥 Conteúdo diário, ensaios inéditos e chat direto comigo. Assine e não perca nada!
                      </p>
                      
                      <div className="flex gap-8 pt-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-xl">42</span>
                          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Posts</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-xl">15.4k</span>
                          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Curtidas</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-xl">8.2k</span>
                          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Assinantes</span>
                        </div>
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUnlock}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-5 rounded-[1.5rem] text-lg uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(16,185,129,0.3)] mb-12 flex items-center justify-center gap-3"
                    >
                      ASSINAR CONTEÚDO EXCLUSIVO
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Stories Section */}
                <div className="mb-10">
                  <div className="px-5 mb-4 flex justify-between items-end">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Stories Recentes</h3>
                    <button className="text-[10px] font-black uppercase text-emerald-500 hover:underline">Ver Todos</button>
                  </div>
                  <div className="flex gap-4 overflow-x-auto px-5 no-scrollbar pb-2">
                    {STORIES.map((story) => (
                      <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                        <div className={`w-16 h-16 rounded-2xl p-0.5 border-2 ${story.isLive ? 'border-emerald-500 animate-pulse' : 'border-zinc-800'} group-hover:border-white transition-colors`}>
                          <img src={story.avatar} alt={story.name} className="w-full h-full rounded-[0.8rem] object-cover" />
                        </div>
                        <span className="text-[9px] font-bold text-zinc-500 group-hover:text-white truncate w-16 text-center">{story.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Tabs */}
                <div className="flex border-b border-white/5 mb-10 sticky top-[64px] bg-black/60 backdrop-blur-xl z-40">
                  <button className="flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-emerald-500 text-emerald-500">Publicações</button>
                  <button className="flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300">Mídia</button>
                  <button className="flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300">Destaques</button>
                </div>

                {/* Posts Feed */}
                <div className="px-5">
                  {MOCK_POSTS.map((post) => (
                    <PostCard key={post.id} post={post} onUnlock={handleUnlock} />
                  ))}
                </div>

                <div className="text-center py-16 opacity-30">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full mx-auto mb-6 flex items-center justify-center animate-float">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.6em]">Fim do Feed Público</p>
                </div>

                <footer className="px-5 py-12 border-t border-white/5 text-center space-y-8">
                  <div className="flex items-center justify-center gap-2 opacity-50">
                    <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-black text-black italic text-xs">P</div>
                    <span className="font-black text-sm tracking-tighter italic">PRIVACY</span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-white transition-colors">Ajuda</a>
                    <a href="#" className="hover:text-white transition-colors">Trabalhe Conosco</a>
                  </div>

                  <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">
                    © 2026 Privacy Clone. Todos os direitos reservados.
                  </p>
                </footer>
              </main>

              {/* Floating Action Button (Mobile) */}
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6 md:hidden">
                <motion.button 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUnlock}
                  className="w-full bg-white text-black font-black py-5 rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                >
                  ASSINAR POR R$ 19,90
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
