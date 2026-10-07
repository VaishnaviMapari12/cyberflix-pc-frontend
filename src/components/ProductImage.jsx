import { useState } from 'react'
import { resolveImageUrl } from '../data/api.js'

const ACC = ['#47bfff', '#863bff', '#a982ff', '#74d7ff']
const hash = (value = '') => [...String(value)].reduce((n, c) => n + c.charCodeAt(0), 0)
const FALLBACK_IMAGES = {
    cpu: '/images.jpeg',
    case: '/images (1).jpeg',
}

const Fan = ({ cx, cy, r, a }) => (
    <g transform={`translate(${cx} ${cy})`}>
        <circle r={r} fill="#100d18" stroke={a} strokeWidth="2" />
        <g className="spin">
            {[0, 72, 144, 216, 288].map((d) => (
                <path
                    key={d}
                    transform={`rotate(${d})`}
                    d={`M0 0C${r * 0.35} ${-r * 0.3} ${r * 0.3} ${-r * 0.75} 0 ${-r * 0.9}C${-r * 0.4} ${-r * 0.6} ${-r * 0.3} ${-r * 0.2} 0 0Z`}
                    fill="#3a4b45"
                    stroke={a}
                    strokeWidth=".6"
                />
            ))}
        </g>
        <circle r={r * 0.18} fill={a} />
    </g>
)

const Defs = () => (
    <defs>
        <linearGradient id="mt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e6ebe8" /><stop offset="1" stopColor="#7f908a" />
        </linearGradient>
        <linearGradient id="dk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34264a" /><stop offset="1" stopColor="#100d18" />
        </linearGradient>
        <linearGradient id="rgb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#47bfff" /><stop offset=".5" stopColor="#863bff" /><stop offset="1" stopColor="#a982ff" />
        </linearGradient>
    </defs>
)

// One drawing per category. viewBox is 200 x 150.
const ART = {
    cpu: (p) => {
        const w = (p?.name || 'CPU').split(' ')
        return (
            <>
                <rect x="52" y="22" width="96" height="96" rx="8" fill="#281740" stroke="#863bff" strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <g key={i} fill="#863bff">
                        <rect x={60 + i * 13} y="122" width="6" height="10" />
                        <rect x={60 + i * 13} y="8" width="6" height="10" />
                    </g>
                ))}
                <rect x="66" y="36" width="68" height="68" rx="6" fill="url(#mt)" stroke="#5c6b65" />
                <rect x="74" y="44" width="52" height="52" rx="4" fill="none" stroke="#5c6b65" strokeDasharray="3 3" />
                <text x="100" y="67" textAnchor="middle" fontSize="13" fontWeight="800" fill="#100d18">{w[0]}</text>
                <text x="100" y="83" textAnchor="middle" fontSize="9" fontWeight="700" fill="#100d18">{w[w.length - 1]}</text>
            </>
        )
    },
    gpu: (p, a) => (
        <>
            <rect x="8" y="34" width="8" height="80" rx="2" fill="url(#mt)" />
            <rect x="14" y="38" width="172" height="66" rx="9" fill="url(#dk)" stroke="#5c6b65" strokeWidth="1.5" />
            <rect x="36" y="104" width="70" height="8" fill="#863bff" />
            <rect x="26" y="41" width="140" height="3" fill={a} />
            <Fan cx={64} cy={72} r={23} a={a} />
            <Fan cx={132} cy={72} r={23} a={a} />
            <rect x="166" y="48" width="14" height="48" rx="3" fill={a} opacity=".85" />
        </>
    ),
    motherboard: (p, a) => (
        <>
            <rect x="34" y="12" width="132" height="126" rx="6" fill="#281740" stroke="#863bff" strokeWidth="1.5" />
            <rect x="46" y="24" width="24" height="54" rx="3" fill="url(#mt)" />
            <rect x="78" y="30" width="40" height="40" rx="3" fill="#1c1c1c" stroke="#863bff" />
            <rect x="83" y="35" width="30" height="30" fill="#100d18" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={130 + i * 8} y="24" width="5" height="58" fill={i % 2 ? a : '#100d18'} />)}
            <path d="M46 88H120M80 70V88" stroke="#863bff" strokeOpacity=".5" fill="none" />
            <rect x="46" y="96" width="108" height="6" fill="#100d18" />
            <rect x="46" y="108" width="108" height="6" fill="#100d18" />
            <rect x="112" y="118" width="40" height="12" rx="2" fill="url(#mt)" />
        </>
    ),
    ram: (p, a) => (
        <>
            {[0, 1].map((i) => (
                <g key={i} transform={`translate(0 ${i * 50 + 3})`}>
                    <rect x="16" y="26" width="168" height="38" rx="4" fill="url(#dk)" stroke="#5c6b65" />
                    <rect x="16" y="26" width="168" height="10" fill={a} />
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
                        <rect key={j} x={26 + j * 19} y="40" width="14" height="14" rx="2" fill="#100d18" stroke="#5c6b65" />
                    ))}
                    <rect x="16" y="64" width="168" height="5" fill="#863bff" />
                </g>
            ))}
        </>
    ),
    storage: (p, a) =>
        p?.name?.includes('HDD') ? (
            <>
                <rect x="46" y="14" width="108" height="122" rx="8" fill="url(#mt)" stroke="#5c6b65" />
                <circle cx="100" cy="66" r="40" fill="#100d18" stroke="#5c6b65" />
                <circle cx="100" cy="66" r="26" fill="none" stroke={a} strokeOpacity=".7" />
                <circle cx="100" cy="66" r="6" fill="url(#mt)" />
                <path d="M142 28L108 62" stroke="#c9d1cc" strokeWidth="4" strokeLinecap="round" />
                <rect x="60" y="114" width="80" height="14" rx="3" fill="#100d18" />
            </>
        ) : (
            <>
                <rect x="24" y="52" width="160" height="46" rx="5" fill="#281740" stroke="#863bff" />
                {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x="24" y={56 + i * 6} width="6" height="3" fill="#863bff" />)}
                <rect x="40" y="60" width="46" height="30" rx="3" fill="#100d18" stroke={a} />
                <rect x="94" y="60" width="38" height="30" rx="3" fill="#100d18" stroke="#5c6b65" />
                <rect x="138" y="60" width="38" height="30" rx="3" fill="#100d18" stroke="#5c6b65" />
                <circle cx="184" cy="75" r="5" fill="#0d0a14" />
            </>
        ),
    psu: (p, a) => (
        <>
            <rect x="32" y="30" width="136" height="90" rx="8" fill="url(#dk)" stroke="#5c6b65" strokeWidth="1.5" />
            <Fan cx={82} cy={75} r={32} a={a} />
            <rect x="128" y="42" width="30" height="66" rx="3" fill="#100d18" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x="132" y={47 + i * 15} width="22" height="10" rx="2" fill="#863bff" />)}
            <path d="M168 58C188 58 190 92 197 112M168 82C182 86 184 106 190 128" stroke={a} strokeWidth="3" fill="none" />
        </>
    ),
    case: (p, a) => (
        <>
            <rect x="56" y="8" width="88" height="134" rx="8" fill="url(#dk)" stroke="#5c6b65" strokeWidth="2" />
            <rect x="64" y="16" width="72" height="118" rx="4" fill="#06120f" stroke={a} strokeOpacity=".5" />
            <Fan cx={78} cy={40} r={9} a={a} />
            <Fan cx={78} cy={68} r={9} a={a} />
            <Fan cx={78} cy={96} r={9} a={a} />
            <rect x="94" y="22" width="34" height="46" rx="3" fill="#281740" />
            <rect x="94" y="76" width="34" height="10" rx="2" fill={a} />
            <rect x="94" y="110" width="34" height="16" rx="2" fill="#24352f" />
            <rect x="56" y="8" width="88" height="3" fill="url(#rgb)" />
        </>
    ),
    cooler: (p, a) => (
        <>
            {[0, 1, 2, 3].map((i) => <rect key={i} x={54 + i * 15} y="24" width="4" height="98" fill="#c9d1cc" />)}
            <rect x="44" y="118" width="74" height="10" rx="2" fill="url(#mt)" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <rect key={i} x="46" y={20 + i * 9.5} width="70" height="6" rx="1" fill="url(#mt)" stroke="#5c6b65" strokeWidth=".5" />
            ))}
            <rect x="120" y="20" width="40" height="96" rx="5" fill="url(#dk)" stroke="#5c6b65" />
            <Fan cx={140} cy={68} r={17} a={a} />
        </>
    ),
    fans: (p, a) => (
        <>
            {[36, 100, 164].map((x) => (
                <g key={x}>
                    <rect x={x - 30} y="44" width="60" height="62" rx="8" fill="#100d18" stroke="#5c6b65" />
                    <Fan cx={x} cy={75} r={26} a={a} />
                </g>
            ))}
        </>
    ),
    monitors: (p, a) => (
        <>
            <linearGradient id={`sc${a.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0d0a14" /><stop offset="1" stopColor={a} />
            </linearGradient>
            <rect x="20" y="12" width="160" height="96" rx="6" fill="#100d18" stroke="#5c6b65" strokeWidth="3" />
            <rect x="26" y="18" width="148" height="84" rx="3" fill={`url(#sc${a.slice(1)})`} />
            <path d="M26 86C60 60 90 98 120 70S160 62 174 80" stroke="#fff" strokeOpacity=".75" fill="none" strokeWidth="2" />
            <rect x="92" y="108" width="16" height="22" fill="url(#mt)" />
            <rect x="64" y="130" width="72" height="8" rx="4" fill="url(#mt)" />
        </>
    ),
    accessories: (p, a) =>
        p?.name?.includes('Mouse') ? (
            <>
                <path d="M100 14C136 14 146 46 146 84C146 122 128 138 100 138C72 138 54 122 54 84C54 46 64 14 100 14Z" fill="url(#dk)" stroke="#5c6b65" strokeWidth="2" />
                <path d="M100 14V66M54 66H146" stroke="#5c6b65" strokeWidth="2" fill="none" />
                <rect x="94" y="28" width="12" height="24" rx="6" fill={a} />
                <rect x="76" y="106" width="48" height="4" rx="2" fill={a} />
            </>
        ) : (
            <>
                <rect x="12" y="38" width="176" height="74" rx="7" fill="url(#dk)" stroke="#5c6b65" />
                {[0, 1, 2, 3].map((r) =>
                    [...Array(11)].map((_, c) => (
                        <rect key={`${r}-${c}`} x={20 + c * 15.5} y={46 + r * 16} width="12" height="12" rx="2" fill="#100d18" stroke={r === 0 ? a : '#3a4b45'} />
                    ))
                )}
            </>
        ),
}

export default function ProductImage({ p, cat, className = '' }) {
    const c = cat || p?.cat || 'accessories'
    const a = ACC[hash(p?.id || c) % ACC.length]
    const imageSource = p?.img?.trim()
    const imageUrl = resolveImageUrl(imageSource)
    const fallbackUrl = FALLBACK_IMAGES[c]
    const [failedImageUrl, setFailedImageUrl] = useState('')
    const displayedImageUrl = imageUrl && failedImageUrl !== imageUrl
        ? imageUrl
        : fallbackUrl && failedImageUrl !== fallbackUrl
            ? fallbackUrl
            : ''

    if (displayedImageUrl) {
        return (
            <div className={`pimg ${className}`} style={{ '--a': a }}>
                <img
                    src={displayedImageUrl}
                    alt={p?.name || 'PC component'}
                    loading="lazy"
                    onError={() => setFailedImageUrl(displayedImageUrl)}
                />
            </div>
        )
    }
    return (
        <div className={`pimg ${className}`} style={{ '--a': a }}>
            <svg viewBox="0 0 200 150" role="img" aria-label={p?.name || c}>
                <Defs />
                {(ART[c] || ART.accessories)(p, a)}
            </svg>
        </div>
    )
}

// Large hero illustration: a complete gaming PC
export function Rig() {
    const a = '#47bfff'
    const g = '#863bff'
    return (
        <svg className="rig" viewBox="0 0 360 440" role="img" aria-label="Cyberflix gaming PC build">
            <Defs />
            <ellipse cx="180" cy="428" rx="140" ry="9" fill="#000" opacity=".35" />
            <rect x="20" y="10" width="320" height="404" rx="20" fill="url(#dk)" stroke={g} strokeWidth="3" />
            <rect x="34" y="24" width="292" height="372" rx="12" fill="#050f0c" stroke={a} strokeOpacity=".4" />
            <rect x="34" y="24" width="292" height="5" fill="url(#rgb)" />
            <Fan cx={70} cy={84} r={26} a={a} />
            <Fan cx={70} cy={164} r={26} a={g} />
            <Fan cx={70} cy={244} r={26} a={a} />
            <rect x="112" y="44" width="200" height="236" rx="6" fill="#281740" stroke={g} strokeOpacity=".6" />
            <rect x="140" y="66" width="76" height="76" rx="8" fill="url(#mt)" />
            <Fan cx={178} cy={104} r={28} a={a} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={240 + i * 15} y="60" width="10" height="92" rx="2" fill={i % 2 ? g : a} />)}
            <rect x="112" y="196" width="204" height="58" rx="8" fill="url(#dk)" stroke={a} />
            <Fan cx={158} cy={225} r={21} a={a} />
            <Fan cx={214} cy={225} r={21} a={a} />
            <Fan cx={270} cy={225} r={21} a={a} />
            <path d="M312 262C336 282 336 316 312 336" stroke={a} strokeWidth="4" fill="none" />
            <rect x="34" y="316" width="292" height="80" fill="#100d18" stroke={g} strokeOpacity=".4" />
            <text x="56" y="368" fontSize="24" fontWeight="800" fill={g} fontFamily="Big Shoulders Display, sans-serif" letterSpacing="3">CYBERFLIX</text>
        </svg>
    )
}