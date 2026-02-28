import { useState } from "react";
import { Download, Image, Monitor, Smartphone, Video, CheckCircle2, Copy, Palette, Star, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { characters } from "../data/characters";

export function AppStoreAssets() {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleDownload = (assetName: string) => {
    toast.success(`📥 ${assetName} downloaded!`, {
      description: "Asset saved to your downloads folder"
    });
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    toast.success(`📋 ${label} copied!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // App metadata for store listings
  const appMetadata = {
    name: "Q Rator Kids",
    subtitle: "Learn Drawing & Coloring with Animal Friends",
    description: "Join Leo the Lion, Milly the Mouse, Ellie the Elephant, Benny the Bunny, and Curator Q. Rator in an exciting art adventure! Q Rator Kids teaches children ages 6-12 drawing and coloring basics through interactive lessons, animated characters, and fun stories.",
    keywords: "kids drawing, coloring app, art education, children learning, animated characters, creative kids, art lessons, drawing for kids",
    category: "Education",
    ageRating: "4+",
    price: "Free with In-App Purchases",
    features: [
      "🦁 5 lovable animal art teachers with unique personalities",
      "🎨 Interactive drawing & coloring lessons for ages 6-12",
      "📚 Engaging stories that teach art concepts",
      "✏️ Fun assignments with real-time feedback",
      "🌟 Progress tracking and achievement system",
      "👨‍👩‍👧‍👦 Parental dashboard with detailed analytics",
      "📱 Works offline - download lessons for on-the-go learning",
      "🎁 Free tier with 3 lessons, stories, and assignments",
    ],
    whatsNew: [
      "✨ New character bio pages with fun facts",
      "🎯 Improved progress tracking system",
      "📊 Enhanced parental dashboard",
      "🎁 Share & earn rewards feature",
      "🐛 Bug fixes and performance improvements",
    ],
    supportURL: "https://qratorkids.com/support",
    privacyURL: "https://qratorkids.com/privacy",
    marketingURL: "https://qratorkids.com",
  };

  const screenshots = {
    ios: [
      { id: 1, title: "Fun Character Teachers", description: "Meet our 5 animal art teachers!" },
      { id: 2, title: "Interactive Lessons", description: "Learn drawing step-by-step" },
      { id: 3, title: "Engaging Stories", description: "Stories that teach art concepts" },
      { id: 4, title: "Track Progress", description: "See your child's achievements" },
      { id: 5, title: "Offline Learning", description: "Download for on-the-go fun" },
    ],
    android: [
      { id: 1, title: "Character Gallery", description: "5 lovable art teachers" },
      { id: 2, title: "Step-by-Step Lessons", description: "Easy to follow tutorials" },
      { id: 3, title: "Creative Stories", description: "Learn while having fun" },
      { id: 4, title: "Parent Dashboard", description: "Monitor progress easily" },
      { id: 5, title: "Assignments & Practice", description: "Reinforce what they learn" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-3xl">
              <Image className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                App Store Assets
              </h1>
              <p className="text-gray-600 mt-1">
                Marketing materials for App Store & Google Play launches
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-700">App Icon</span>
              </div>
              <p className="text-sm text-green-600">1024×1024 Ready</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-700">Screenshots</span>
              </div>
              <p className="text-sm text-blue-600">8 per platform</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-700">Graphics</span>
              </div>
              <p className="text-sm text-purple-600">Feature banners</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border-2 border-pink-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-pink-600" />
                <span className="font-bold text-pink-700">Video</span>
              </div>
              <p className="text-sm text-pink-600">30s Preview</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="icon" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-white p-2 rounded-xl shadow-sm">
            <TabsTrigger value="icon" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-2" />
              App Icon
            </TabsTrigger>
            <TabsTrigger value="screenshots" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Smartphone className="w-4 h-4 mr-2" />
              Screenshots
            </TabsTrigger>
            <TabsTrigger value="graphics" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Image className="w-4 h-4 mr-2" />
              Graphics
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Video className="w-4 h-4 mr-2" />
              Preview Video
            </TabsTrigger>
            <TabsTrigger value="metadata" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Monitor className="w-4 h-4 mr-2" />
              Store Info
            </TabsTrigger>
          </TabsList>

          {/* App Icon Tab */}
          <TabsContent value="icon" className="space-y-6">
            <Card className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">App Icon</h2>
                <p className="text-gray-600">1024×1024 px, PNG with transparency</p>
              </div>

              <div className="max-w-2xl mx-auto">
                {/* App Icon Preview */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-3xl mb-6">
                  <div className="bg-white rounded-[80px] shadow-2xl p-8 mx-auto w-fit">
                    {/* Actual App Icon Design */}
                    <div className="w-64 h-64 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-[60px] flex items-center justify-center relative overflow-hidden shadow-inner">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 right-4 w-8 h-8 bg-white rounded-full"></div>
                      </div>
                      
                      {/* Main content */}
                      <div className="relative z-10 text-center">
                        <div className="text-6xl mb-2">🎨</div>
                        <div className="flex justify-center gap-1 mb-2">
                          <span className="text-3xl">🦁</span>
                          <span className="text-3xl">🐭</span>
                          <span className="text-3xl">🐘</span>
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full">
                          <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Q Rator
                          </span>
                        </div>
                        <div className="text-white text-sm font-bold mt-1 tracking-wider">KIDS</div>
                      </div>

                      {/* Corner stars */}
                      <div className="absolute top-3 right-3 text-yellow-300 text-2xl">✨</div>
                      <div className="absolute bottom-3 left-3 text-yellow-300 text-xl">⭐</div>
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleDownload('App Icon - 1024x1024')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    1024×1024
                  </Button>
                  <Button 
                    onClick={() => handleDownload('App Icon - 512x512')}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    512×512
                  </Button>
                  <Button 
                    onClick={() => handleDownload('App Icon - 180x180')}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    180×180
                  </Button>
                </div>

                {/* Requirements */}
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Icon Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Square format with no transparency (will be masked)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>No text that's too small to read</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Bright, eye-catching colors perfect for kids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Shows brand identity with character emojis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Screenshots Tab */}
          <TabsContent value="screenshots" className="space-y-6">
            <Card className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">App Screenshots</h2>
                <p className="text-gray-600">5-8 screenshots showing key features</p>
              </div>

              {/* Platform Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant={selectedPlatform === 'ios' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('ios')}
                  className={selectedPlatform === 'ios' ? 'bg-blue-500' : ''}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  iOS (iPhone)
                </Button>
                <Button
                  variant={selectedPlatform === 'android' ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform('android')}
                  className={selectedPlatform === 'android' ? 'bg-green-500' : ''}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Android
                </Button>
              </div>

              {/* Screenshot Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {screenshots[selectedPlatform].map((screenshot) => (
                  <div key={screenshot.id} className="group">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl mb-3 aspect-[9/19.5] relative overflow-hidden">
                      {/* Phone frame */}
                      <div className="absolute inset-3 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Status bar */}
                        <div className="h-8 bg-gray-50 flex items-center justify-between px-4">
                          <span className="text-xs font-medium">9:41</span>
                          <div className="flex gap-1">
                            <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
                            <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
                            <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
                          </div>
                        </div>

                        {/* Screenshot content preview */}
                        <div className="flex-1 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 flex flex-col items-center justify-center">
                          {screenshot.id === 1 && (
                            <div className="text-center">
                              <div className="flex justify-center gap-2 mb-4">
                                <span className="text-5xl">🦁</span>
                                <span className="text-5xl">🐭</span>
                              </div>
                              <div className="flex justify-center gap-2 mb-4">
                                <span className="text-5xl">🐘</span>
                                <span className="text-5xl">🐰</span>
                              </div>
                              <div className="text-3xl mb-2">🎨</div>
                              <div className="text-xs font-bold text-purple-700">Meet Your Teachers!</div>
                            </div>
                          )}
                          
                          {screenshot.id === 2 && (
                            <div className="text-center w-full">
                              <div className="text-5xl mb-4">🦁</div>
                              <div className="bg-white p-3 rounded-xl mb-3 shadow-sm">
                                <div className="text-xs font-bold text-gray-700 mb-2">Step 1: Draw a circle</div>
                                <div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <div className="w-12 h-12 border-4 border-purple-400 rounded-full"></div>
                                </div>
                              </div>
                              <div className="flex gap-2 justify-center">
                                {[1,2,3,4].map(i => (
                                  <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                                ))}
                              </div>
                            </div>
                          )}

                          {screenshot.id === 3 && (
                            <div className="text-center w-full">
                              <div className="text-4xl mb-3">📚</div>
                              <div className="bg-white p-3 rounded-xl shadow-sm mb-2">
                                <div className="text-xs font-bold text-gray-700 mb-2">Leo's Colorful Adventure</div>
                                <div className="text-xs text-gray-600">Learn about warm colors!</div>
                              </div>
                              <div className="flex gap-2 justify-center mt-3">
                                <div className="w-12 h-12 bg-red-200 rounded-lg"></div>
                                <div className="w-12 h-12 bg-yellow-200 rounded-lg"></div>
                                <div className="w-12 h-12 bg-orange-200 rounded-lg"></div>
                              </div>
                            </div>
                          )}

                          {screenshot.id === 4 && (
                            <div className="text-center w-full px-2">
                              <div className="text-4xl mb-3">🏆</div>
                              <div className="space-y-2">
                                <div className="bg-white p-2 rounded-lg shadow-sm flex items-center gap-2">
                                  <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-lg">⭐</div>
                                  <div className="text-left flex-1">
                                    <div className="text-xs font-bold">Lessons: 5/20</div>
                                    <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                                      <div className="h-full w-1/4 bg-green-500 rounded-full"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-sm flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-lg">🎨</div>
                                  <div className="text-left flex-1">
                                    <div className="text-xs font-bold">Stars Earned: 45</div>
                                    <div className="text-xs text-gray-500">Keep it up!</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {screenshot.id === 5 && (
                            <div className="text-center w-full">
                              <div className="text-4xl mb-3">📱</div>
                              <div className="bg-white p-3 rounded-xl shadow-sm">
                                <div className="text-xs font-bold text-gray-700 mb-3">Downloaded Lessons</div>
                                <div className="space-y-2">
                                  {[1,2,3].map(i => (
                                    <div key={i} className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                      <div className="text-xs text-left flex-1">Lesson {i}</div>
                                      <Download className="w-3 h-3 text-green-600" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-bold text-gray-800 mb-1">{screenshot.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{screenshot.description}</p>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(`Screenshot ${screenshot.id} - ${screenshot.title}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-3 h-3 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    iOS Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• iPhone 6.7": 1290 × 2796 px</li>
                    <li>• iPhone 6.5": 1242 × 2688 px</li>
                    <li>• iPhone 5.5": 1242 × 2208 px</li>
                    <li>• iPad Pro 12.9": 2048 × 2732 px</li>
                    <li>• 5-10 screenshots recommended</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Android Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Phone: 1080 × 1920 px minimum</li>
                    <li>• 7" Tablet: 1200 × 1920 px</li>
                    <li>• 10" Tablet: 1800 × 2560 px</li>
                    <li>• 2-8 screenshots per device type</li>
                    <li>• PNG or JPEG format</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Graphics Tab */}
          <TabsContent value="graphics" className="space-y-6">
            <Card className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Promotional Graphics</h2>
                <p className="text-gray-600">Feature graphics and promotional banners</p>
              </div>

              <div className="space-y-8">
                {/* Feature Graphic - Google Play */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Feature Graphic (Google Play)
                  </h3>
                  <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-8 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNjAgMTAgTSAxMCAwIEwgMTAgNjAgTSAwIDIwIEwgNjAgMjAgTSAyMCAwIEwgMjAgNjAgTSAwIDMwIEwgNjAgMzAgTSAzMCAwIEwgMzAgNjAgTSAwIDQwIEwgNjAgNDAgTSA0MCAwIEwgNDAgNjAgTSAwIDUwIEwgNjAgNTAgTSA1MCAwIEwgNTAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex-1">
                        <h2 className="text-5xl font-black text-white mb-3">Q Rator Kids</h2>
                        <p className="text-2xl text-white/95 mb-4">Learn Art with Animal Friends! 🎨</p>
                        <div className="flex gap-3">
                          <span className="text-4xl">🦁</span>
                          <span className="text-4xl">🐭</span>
                          <span className="text-4xl">🐘</span>
                          <span className="text-4xl">🐰</span>
                          <span className="text-4xl">🎨</span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                        <div className="flex gap-2 mb-2">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-8 h-8 fill-yellow-300 text-yellow-300" />
                          ))}
                        </div>
                        <p className="text-white font-bold text-center">Ages 6-12</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">1024 × 500 px (Google Play requirement)</p>
                    <Button onClick={() => handleDownload('Feature Graphic - 1024x500')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Promotional Banner */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    Promotional Banner
                  </h3>
                  <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-2xl p-6 mb-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-[200px] opacity-10">🎨</div>
                    <div className="relative z-10">
                      <div className="bg-white inline-block px-4 py-1 rounded-full mb-3">
                        <span className="text-sm font-bold text-orange-600">🎁 FREE TRIAL - Try 3 Lessons!</span>
                      </div>
                      <h2 className="text-4xl font-black text-white mb-2">Start Drawing Today!</h2>
                      <p className="text-xl text-white/95 mb-4">Join thousands of young artists learning with Q Rator Kids</p>
                      <div className="flex items-center gap-4">
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-white font-bold">5 Fun Teachers</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-white font-bold">50+ Lessons</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-white font-bold">Works Offline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">1200 × 628 px (Social media optimized)</p>
                    <Button onClick={() => handleDownload('Promotional Banner - 1200x628')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Square Promotional Graphic */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Square Promo (Social Media)</h3>
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-2xl p-8 mb-4 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="absolute top-8 left-8 w-20 h-20 bg-white/20 rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/20 rounded-full"></div>
                        <div className="absolute top-1/2 right-12 w-12 h-12 bg-white/20 rounded-full"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="text-7xl mb-4">🎨</div>
                        <h2 className="text-4xl font-black text-white mb-3">Q Rator Kids</h2>
                        <p className="text-xl text-white/95 mb-4">Art Education Made Fun!</p>
                        <div className="flex justify-center gap-2 mb-4">
                          <span className="text-3xl">🦁</span>
                          <span className="text-3xl">🐭</span>
                          <span className="text-3xl">🐘</span>
                          <span className="text-3xl">🐰</span>
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
                          <p className="font-bold text-purple-600">Download Free Today!</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">1080 × 1080 px (Instagram, Facebook)</p>
                      <Button onClick={() => handleDownload('Square Promo - 1080x1080')}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Preview Video Tab */}
          <TabsContent value="video" className="space-y-6">
            <Card className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">App Preview Video</h2>
                <p className="text-gray-600">15-30 second preview for app stores</p>
              </div>

              {/* Video Mockup */}
              <div className="max-w-3xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 aspect-video relative overflow-hidden">
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-all hover:scale-110 shadow-2xl">
                      <div className="w-0 h-0 border-l-[24px] border-l-purple-600 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent ml-1"></div>
                    </button>
                  </div>

                  {/* Video preview frame */}
                  <div className="absolute inset-8 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-xl overflow-hidden">
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                      <div className="text-6xl mb-4">🎨</div>
                      <h3 className="text-3xl font-black text-white mb-3">Q Rator Kids</h3>
                      <p className="text-xl text-white/95 mb-4">Watch Our Preview!</p>
                      <div className="flex gap-3">
                        <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🦁</span>
                        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>🐭</span>
                        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🐘</span>
                        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>🐰</span>
                      </div>
                    </div>
                  </div>

                  {/* Video timeline */}
                  <div className="absolute bottom-4 left-8 right-8 z-30">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-0"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Button onClick={() => handleDownload('App Preview Video - 30s')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video Template
                  </Button>
                </div>
              </div>

              {/* Video Script/Storyboard */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Video Script (30 seconds)</h3>
                
                <div className="space-y-3">
                  {[
                    { time: "0-3s", scene: "Q Rator Kids logo animation", visual: "Animated logo with characters popping in" },
                    { time: "3-6s", scene: "Meet the Teachers", visual: "Quick cuts of all 5 animal characters waving" },
                    { time: "6-12s", scene: "Interactive Lessons", visual: "Kid using app, following Leo's drawing tutorial" },
                    { time: "12-18s", scene: "Fun Stories & Games", visual: "Storybook pages turning, colorful animations" },
                    { time: "18-24s", scene: "Progress & Achievements", visual: "Stars earned, certificates, parent dashboard" },
                    { time: "24-27s", scene: "Works Offline", visual: "Download icon, airplane mode, happy kid drawing" },
                    { time: "27-30s", scene: "Call to Action", visual: "Download now! Free trial badge, app store buttons" },
                  ].map((scene, idx) => (
                    <div key={idx} className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                      <div className="flex gap-4">
                        <div className="bg-purple-500 text-white px-3 py-1 rounded-lg h-fit font-bold text-sm">
                          {scene.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-purple-900 mb-1">{scene.scene}</h4>
                          <p className="text-sm text-purple-700">{scene.visual}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Requirements */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">iOS App Preview</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• 15-30 seconds recommended</li>
                    <li>• Portrait: 1080 × 1920 px</li>
                    <li>• Landscape: 1920 × 1080 px</li>
                    <li>• .mov or .mp4 format</li>
                    <li>• Up to 500 MB file size</li>
                    <li>• Show actual app footage</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3">Google Play Video</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• 30 seconds to 2 minutes</li>
                    <li>• 16:9 aspect ratio</li>
                    <li>• Minimum 1280 × 720 px</li>
                    <li>• YouTube video link</li>
                    <li>• No calls to action in first 5s</li>
                    <li>• Show gameplay/features</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Store Metadata Tab */}
          <TabsContent value="metadata" className="space-y-6">
            <Card className="p-8 bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">App Store Information</h2>
                <p className="text-gray-600">Copy-ready text for app store listings</p>
              </div>

              <div className="space-y-6 max-w-4xl mx-auto">
                {/* App Name */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">App Name</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.name, "App Name")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "App Name" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-lg font-medium text-purple-600">{appMetadata.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Character limit: 30 (iOS) / 50 (Android)</p>
                </div>

                {/* Subtitle */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">Subtitle (iOS) / Short Description (Android)</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.subtitle, "Subtitle")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "Subtitle" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-gray-700">{appMetadata.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">Character limit: 30 (iOS) / 80 (Android)</p>
                </div>

                {/* Description */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">App Description</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.description, "Description")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "Description" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{appMetadata.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Character limit: 4000 (iOS) / 4000 (Android)</p>
                </div>

                {/* Keywords */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">Keywords (iOS)</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.keywords, "Keywords")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "Keywords" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-gray-700">{appMetadata.keywords}</p>
                  <p className="text-sm text-gray-500 mt-1">Character limit: 100 (comma-separated)</p>
                </div>

                {/* Features List */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800">Key Features (for bullet points)</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.features.join('\n'), "Features")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "Features" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {appMetadata.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's New */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800">What's New (Version Notes)</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(appMetadata.whatsNew.join('\n'), "What's New")}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      {copiedText === "What's New" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {appMetadata.whatsNew.map((item, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-3">Character limit: 4000</p>
                </div>

                {/* Category & Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-3">App Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-800">{appMetadata.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age Rating</p>
                        <p className="font-medium text-gray-800">{appMetadata.ageRating}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price Model</p>
                        <p className="font-medium text-gray-800">{appMetadata.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-3">Support Links</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Support URL</p>
                        <p className="text-sm text-blue-600 break-all">{appMetadata.supportURL}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Privacy Policy</p>
                        <p className="text-sm text-blue-600 break-all">{appMetadata.privacyURL}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Marketing URL</p>
                        <p className="text-sm text-blue-600 break-all">{appMetadata.marketingURL}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download All Metadata */}
                <div className="text-center pt-4">
                  <Button
                    size="lg"
                    onClick={() => handleDownload('Complete App Store Metadata')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete Metadata Package
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Launch Checklist */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 mt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Pre-Launch Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { item: "App Icon (all sizes)", done: true },
              { item: "Screenshots (5+ per platform)", done: true },
              { item: "Feature Graphic (1024×500)", done: true },
              { item: "App Preview Video (30s)", done: true },
              { item: "App Description & Metadata", done: true },
              { item: "Privacy Policy URL", done: false },
              { item: "Support/Help URL", done: false },
              { item: "Age Rating Certificate", done: false },
              { item: "Test on real devices", done: false },
              { item: "Beta testing complete", done: false },
              { item: "Legal review complete", done: false },
              { item: "Payment/subscription setup", done: true },
            ].map((task, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${task.done ? 'bg-green-100' : 'bg-white'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {task.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <span className={`font-medium ${task.done ? 'text-green-800' : 'text-gray-700'}`}>
                  {task.item}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
