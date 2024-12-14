"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

export default function AudioToolDocs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Audio Generation</h1>
        <p className="text-lg text-muted-foreground">
          Create high-quality audio content, from text-to-speech to music
          generation and sound effects.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          Our audio generation tool provides multiple AI models for creating
          various types of audio content. Whether you need natural-sounding
          voiceovers, background music, or sound effects, our tool can help you
          generate professional audio assets.
        </p>

        <Alert>
          <AlertTitle>Credits Usage</AlertTitle>
          <AlertDescription>
            Audio generation credits are calculated based on duration, quality
            settings, and the specific model used. Higher quality and longer
            durations consume more credits.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Text-to-Speech</h3>
              <Badge>Core</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Convert text to natural-sounding speech with multiple voices and
              languages.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Music Generation</h3>
              <Badge>Creative</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Create original background music and melodies in various genres
              and styles.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Sound Effects</h3>
              <Badge>Professional</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate custom sound effects for multimedia projects and
              applications.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Models</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Neural Voice</h3>
              <Badge>Text-to-Speech</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              High-quality, natural-sounding voices with emotion and style
              control.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">MusicGen</h3>
              <Badge>Music</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced music generation with genre, style, and instrument
              control.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">AudioFX</h3>
              <Badge>Effects</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Customizable sound effects generation for various applications.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How to Use</h2>
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the Dashboard</h3>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Navigate to the Audio Generation tool</li>
              <li>
                Choose your generation type:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Text-to-Speech: Enter text and select voice</li>
                  <li>Music: Describe style and mood</li>
                  <li>Sound Effects: Select category and customize</li>
                </ul>
              </li>
              <li>
                Configure audio parameters:
                <ul className="ml-6 mt-2 space-y-2 list-disc">
                  <li>Duration</li>
                  <li>Quality settings</li>
                  <li>Output format</li>
                  <li>Special effects</li>
                </ul>
              </li>
              <li>Click &quot;Generate&quot; and wait for processing</li>
            </ol>
          </TabsContent>
          <TabsContent value="api" className="space-y-4">
            <h3 className="text-xl font-semibold">Using the API</h3>
            <div className="space-y-4">
              <p>Make a POST request to our audio generation endpoint:</p>
              <Code>
                {`POST /api/v1/audio/generate
Content-Type: application/json

{
  "type": "text-to-speech",
  "text": "Welcome to our platform! We're excited to have you here.",
  "voice": "emma",
  "language": "en-US",
  "style": "professional",
  "speed": 1.0,
  "format": "mp3",
  "quality": "high"
}`}
              </Code>
              <p className="text-sm text-muted-foreground">
                The API will return a JSON response with the audio URL and
                metadata.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Writing Audio Prompts</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Be specific about style and mood</li>
            <li>Include tempo and intensity preferences</li>
            <li>Specify any required instruments or sounds</li>
            <li>Consider the target audience and context</li>
          </ul>
        </div>
        <Alert>
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            For text-to-speech, use punctuation to control pacing and add
            natural pauses. For music, describe the emotional journey you want
            to convey.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Professional Voiceover</h3>
            <Code>
              {`{
  "type": "text-to-speech",
  "text": "Discover the future of technology with our innovative solutions.",
  "voice": "professional-male-1",
  "style": "business",
  "emphasis": ["future", "innovative"],
  "pace": "moderate"
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Background Music</h3>
            <Code>
              {`{
  "type": "music",
  "style": "ambient",
  "mood": "inspiring",
  "tempo": "moderate",
  "duration": 120,
  "instruments": ["piano", "strings"],
  "key": "C major"
}`}
            </Code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Game Sound Effect</h3>
            <Code>
              {`{
  "type": "sound_effect",
  "category": "game",
  "style": "fantasy",
  "description": "Magical spell casting with sparkles",
  "duration": 2,
  "layers": ["magic", "sparkle", "whoosh"]
}`}
            </Code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Audio Quality</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Quality Settings</h3>
            <ul className="mt-2 space-y-2 list-disc list-inside">
              <li>Sample rate options</li>
              <li>Bit depth selection</li>
              <li>Compression levels</li>
              <li>Format optimization</li>
            </ul>
          </div>
          <Alert>
            <AlertTitle>File Formats</AlertTitle>
            <AlertDescription>
              We support various output formats including MP3, WAV, and OGG.
              Choose based on your quality requirements and compatibility needs.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
