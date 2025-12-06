"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Shield, QrCode, CheckCircle, FileText, Search, Link2 } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface Certificate {
  id: string
  title: string
  issuer: string
  dateIssued: string
  hash: string
  verified: boolean
  txHash?: string
}

const sampleCertificates: Certificate[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    issuer: "Christex Foundation",
    dateIssued: "2024-06-15",
    hash: "0x8f4a2b1c9e7d6f3a5b8c4d2e1f0a9b8c7d6e5f4a",
    verified: true,
    txHash: "0xabc123...",
  },
  {
    id: "2",
    title: "Blockchain Basics Certificate",
    issuer: "Tech Academy SL",
    dateIssued: "2024-08-20",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    verified: true,
    txHash: "0xdef456...",
  },
]

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(sampleCertificates)
  const [isUploading, setIsUploading] = useState(false)
  const [verifyHash, setVerifyHash] = useState("")
  const [verificationResult, setVerificationResult] = useState<"verified" | "not-found" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    // Simulate upload and hashing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newCert: Certificate = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      issuer: "Pending Verification",
      dateIssued: new Date().toISOString().split("T")[0],
      hash:
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      verified: false,
    }

    setCertificates((prev) => [newCert, ...prev])
    setIsUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleVerify = () => {
    const found = certificates.find((c) => c.hash.toLowerCase().includes(verifyHash.toLowerCase()))
    setVerificationResult(found ? "verified" : "not-found")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold sm:text-3xl">Certificate Verification</h1>
            <p className="mt-1 text-muted-foreground">Upload and verify certificates with blockchain-backed security</p>
          </div>

          <Tabs defaultValue="my-certs" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="my-certs" className="gap-2">
                <FileText className="h-4 w-4" />
                My Certificates
              </TabsTrigger>
              <TabsTrigger value="verify" className="gap-2">
                <Search className="h-4 w-4" />
                Verify
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-certs">
              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* Certificates list */}
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="relative">
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={80}
                        inactiveZone={0.3}
                        borderWidth={2}
                      />
                      <Card className="relative">
                        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{cert.title}</h3>
                                {cert.verified ? (
                                  <Badge className="gap-1 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                    <CheckCircle className="h-3 w-3" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Pending</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                              <p className="mt-1 font-mono text-xs text-muted-foreground">
                                {cert.hash.slice(0, 10)}...{cert.hash.slice(-8)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <QrCode className="h-4 w-4" />
                              <span className="hidden sm:inline">QR Code</span>
                            </Button>
                            {cert.txHash && (
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Link2 className="h-4 w-4" />
                                <span className="hidden sm:inline">View on Chain</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Upload section */}
                <div className="relative lg:sticky lg:top-24 lg:self-start">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.3}
                    borderWidth={2}
                  />
                  <Card className="relative">
                    <CardHeader>
                      <CardTitle className="text-lg">Upload Certificate</CardTitle>
                      <CardDescription>
                        Upload a certificate to generate its hash and store on blockchain
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-8 transition-colors hover:border-primary/50 hover:bg-muted/50"
                      >
                        <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                        <p className="text-sm font-medium">Click to upload</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      {isUploading && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Processing...
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="verify">
              <div className="relative mx-auto max-w-xl">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={80}
                  inactiveZone={0.3}
                  borderWidth={2}
                />
                <Card className="relative">
                  <CardHeader>
                    <CardTitle>Verify a Certificate</CardTitle>
                    <CardDescription>Enter a certificate hash or scan a QR code to verify authenticity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hash">Certificate Hash</Label>
                      <div className="flex gap-2">
                        <Input
                          id="hash"
                          placeholder="0x..."
                          value={verifyHash}
                          onChange={(e) => setVerifyHash(e.target.value)}
                        />
                        <Button onClick={handleVerify}>Verify</Button>
                      </div>
                    </div>

                    {verificationResult && (
                      <Card
                        className={
                          verificationResult === "verified"
                            ? "border-green-500/50 bg-green-500/10"
                            : "border-destructive/50 bg-destructive/10"
                        }
                      >
                        <CardContent className="flex items-center gap-3 p-4">
                          {verificationResult === "verified" ? (
                            <>
                              <CheckCircle className="h-6 w-6 text-green-500" />
                              <div>
                                <p className="font-semibold text-green-500">Certificate Verified</p>
                                <p className="text-sm text-muted-foreground">
                                  This certificate is authentic and stored on-chain
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Shield className="h-6 w-6 text-destructive" />
                              <div>
                                <p className="font-semibold text-destructive">Not Found</p>
                                <p className="text-sm text-muted-foreground">This hash was not found in our records</p>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or scan QR</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <QrCode className="h-4 w-4" />
                      Scan QR Code
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
