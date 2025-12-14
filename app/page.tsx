'use client'

import { useMemo, useState } from 'react'

type Axis = 'x' | 'y' | 'z'
type Rotations = Record<Axis, number>

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))

function AxisControl({
    axis,
    value,
    onChange,
}: {
    axis: Axis
    value: number
    onChange: (next: number) => void
}) {
    const label = axis.toUpperCase()
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium text-slate-200">
                        Rotation {label}
                    </p>
                    <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-200">
                        degrees
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        aria-label={`Rotation ${label} in degrees`}
                        className="w-24 rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30"
                        type="number"
                        inputMode="numeric"
                        min={-180}
                        max={180}
                        step={1}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                    />
                    <span className="text-sm text-slate-400">°</span>
                </div>
            </div>

            <div className="mt-3">
                <input
                    aria-label={`Rotation ${label} slider`}
                    className="h-2 w-full accent-fuchsia-400"
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>-180°</span>
                    <span>0°</span>
                    <span>180°</span>
                </div>
            </div>
        </div>
    )
}

function GateButton({
    label,
    onClick,
}: {
    label: string
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
        >
            {label}
        </button>
    )
}

export default function Page() {
    const [rotations, setRotations] = useState<Rotations>({ x: 0, y: 0, z: 0 })
    const [lastAction, setLastAction] = useState<string>('—')

    const rotationSummary = useMemo(() => {
        const fmt = (n: number) => `${n.toFixed(0)}°`
        return `x ${fmt(rotations.x)} · y ${fmt(rotations.y)} · z ${fmt(rotations.z)}`
    }, [rotations.x, rotations.y, rotations.z])

    const setAxis = (axis: Axis, next: number) => {
        setRotations((prev) => ({
            ...prev,
            [axis]: clamp(Number.isFinite(next) ? next : 0, -180, 180),
        }))
        setLastAction(`Set rotation ${axis.toUpperCase()} to ${next.toFixed(0)}°`)
    }

    const applyGate = (gate: string) => {
        setLastAction(`Gate: ${gate}`)
    }

    const reset = () => {
        setRotations({ x: 0, y: 0, z: 0 })
        setLastAction('Reset rotations')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-950">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            Quantum Bloch Sphere
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Placeholder UI for your Bloch Sphere package — rotations + basic gates.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-xs text-slate-400">Current</p>
                        <p className="mt-0.5 text-sm font-medium text-slate-100">
                            {rotationSummary}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Last action: <span className="text-slate-200">{lastAction}</span>
                        </p>
                    </div>
                </header>

                <main className="mt-8 grid gap-6 lg:grid-cols-2">
                    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Bloch Sphere
                            </h2>
                            <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-200">
                                placeholder
                            </span>
                        </div>

                        <div className="mt-4 aspect-square w-full rounded-2xl bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-sky-500/15 p-[1px]">
                            <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 px-6 text-center">
                                <p className="text-base font-semibold text-white">
                                    Bloch Sphere Visualization
                                </p>
                                <p className="mt-2 max-w-sm text-sm text-slate-300">
                                    Drop your future <code className="rounded bg-white/10 px-1 py-0.5">&lt;BlochSphere /&gt;</code>{' '}
                                    component here.
                                </p>
                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                                        Rotations: {rotationSummary}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Controls
                            </h2>
                            <button
                                type="button"
                                onClick={reset}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="mt-4 grid gap-4">
                            <AxisControl
                                axis="x"
                                value={rotations.x}
                                onChange={(n) => setAxis('x', n)}
                            />
                            <AxisControl
                                axis="y"
                                value={rotations.y}
                                onChange={(n) => setAxis('y', n)}
                            />
                            <AxisControl
                                axis="z"
                                value={rotations.z}
                                onChange={(n) => setAxis('z', n)}
                            />
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-sm font-semibold text-slate-100">
                                    Basic gates
                                </h3>
                                <p className="text-xs text-slate-400">UI only</p>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                <GateButton label="H" onClick={() => applyGate('H')} />
                                <GateButton label="X" onClick={() => applyGate('X')} />
                                <GateButton label="Y" onClick={() => applyGate('Y')} />
                                <GateButton label="Z" onClick={() => applyGate('Z')} />
                                <GateButton label="S" onClick={() => applyGate('S')} />
                                <GateButton label="T" onClick={() => applyGate('T')} />
                                <GateButton label="Rx" onClick={() => applyGate('Rx')} />
                                <GateButton label="Ry" onClick={() => applyGate('Ry')} />
                                <GateButton label="Rz" onClick={() => applyGate('Rz')} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}