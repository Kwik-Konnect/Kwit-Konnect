"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
})

interface MapItem {
    id: string
    lat: number
    lng: number
    title: string
    description?: string
    link?: string
}

interface LeafletMapProps {
    items: MapItem[]
    center?: [number, number]
    zoom?: number
    height?: string
}

// Component to update map view when center changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, zoom)
    }, [center, zoom, map])
    return null
}

export default function LeafletMap({
    items,
    center = [8.4606, -13.2324], // Default to Freetown, Sierra Leone
    zoom = 13,
    height = "500px",
}: LeafletMapProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div
                style={{ height }}
                className="flex items-center justify-center bg-muted/20 border-2 rounded-lg"
            >
                <p className="text-muted-foreground animate-pulse">Loading Map...</p>
            </div>
        )
    }

    return (
        <div className="relative rounded-lg overflow-hidden border-2 border-border z-0">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height, width: "100%" }}
                scrollWheelZoom={false}
            >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map((item) => (
                    <Marker key={item.id} position={[item.lat, item.lng]} icon={defaultIcon}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-sm block mb-1">{item.title}</h3>
                                {item.description && <p className="text-xs text-muted-foreground m-0">{item.description}</p>}
                                {item.link && (
                                    <a href={item.link} className="text-xs text-primary hover:underline mt-1 block">
                                        View Details
                                    </a>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
