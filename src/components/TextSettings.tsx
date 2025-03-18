
import React, { useState } from 'react';
import { TypingSettings } from '@/utils/typingUtils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Keyboard as KeyboardIcon, Type, FileText, Settings } from "lucide-react";
import { cn } from '@/lib/utils';

interface TextSettingsProps {
  settings: TypingSettings;
  onUpdateSettings: (settings: Partial<TypingSettings>) => void;
  onCustomTextSubmit?: (text: string) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({ 
  settings, 
  onUpdateSettings,
  onCustomTextSubmit
}) => {
  const [customText, setCustomText] = useState<string>('');
  const [showCustomText, setShowCustomText] = useState<boolean>(false);

  const handleCustomTextSubmit = () => {
    if (onCustomTextSubmit && customText.trim().length > 0) {
      onCustomTextSubmit(customText);
    }
  };

  const clearCustomText = () => {
    setCustomText('');
  };

  return (
    <div className="text-settings glass-card p-6">
      <h3 className="text-xl font-semibold text-center mb-5 flex items-center justify-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        Typing Settings
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium block mb-2 flex items-center gap-1">
            <FileText className="h-4 w-4 text-primary" />
            Text Selection
          </Label>
          <Select 
            value={settings.textSelection} 
            onValueChange={(value) => onUpdateSettings({ textSelection: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20 h-11 text-base">
              <SelectValue placeholder="Select text selection mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Random</SelectItem>
              <SelectItem value="sequential">Sequential</SelectItem>
              <SelectItem value="difficulty">By Difficulty</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium block mb-2 flex items-center gap-1">
            <Type className="h-4 w-4 text-primary" />
            Text Type
          </Label>
          <Select 
            value={settings.textType} 
            onValueChange={(value) => {
              onUpdateSettings({ textType: value as any });
              if (value === 'custom') {
                setShowCustomText(true);
              } else {
                setShowCustomText(false);
              }
            }}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20 h-11 text-base">
              <SelectValue placeholder="Select text type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Texts</SelectItem>
              <SelectItem value="book">Books</SelectItem>
              <SelectItem value="prose">Short Stories</SelectItem>
              <SelectItem value="lyrics">Song Lyrics</SelectItem>
              <SelectItem value="code">Code Snippets</SelectItem>
              <SelectItem value="quotes">Quotes</SelectItem>
              <SelectItem value="facts">Random Facts</SelectItem>
              <SelectItem value="pangrams">Pangrams</SelectItem>
              <SelectItem value="words">Random Words</SelectItem>
              <SelectItem value="proverbs">Proverbs</SelectItem>
              <SelectItem value="custom">Custom Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showCustomText && (
        <div className="mb-6 animate-in fade-in duration-300">
          <Label className="text-sm font-medium block mb-2">Custom Text</Label>
          <Textarea 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your custom text here..."
            className="mb-2 min-h-[100px] text-base"
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleCustomTextSubmit}
              className="bg-primary hover:bg-primary/90 h-10 text-base"
              size="default"
            >
              Submit
            </Button>
            <Button 
              onClick={clearCustomText}
              variant="outline"
              size="default"
              className="h-10 text-base"
            >
              Clear Text
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium block mb-2 flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            Test Time
          </Label>
          <Select 
            value={settings.testTime} 
            onValueChange={(value) => onUpdateSettings({ testTime: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20 h-11 text-base">
              <SelectValue placeholder="Select test time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30sec">30 seconds</SelectItem>
              <SelectItem value="1min">1 minute</SelectItem>
              <SelectItem value="2min">2 minutes</SelectItem>
              <SelectItem value="3min">3 minutes</SelectItem>
              <SelectItem value="5min">5 minutes</SelectItem>
              <SelectItem value="10min">10 minutes</SelectItem>
              <SelectItem value="15min">15 minutes</SelectItem>
              <SelectItem value="20min">20 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium block mb-2">Text Color Highlighting</Label>
          <Select 
            value={settings.textColorHighlighting} 
            onValueChange={(value) => onUpdateSettings({ textColorHighlighting: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20 h-11 text-base">
              <SelectValue placeholder="Select highlighting style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="enhanced">High Visibility</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium block mb-2 flex items-center gap-1">
            <KeyboardIcon className="h-4 w-4 text-primary" />
            Keyboard Layout
          </Label>
          <Select 
            value={settings.keyboardLayout} 
            onValueChange={(value) => onUpdateSettings({ keyboardLayout: value as any })}
          >
            <SelectTrigger className={cn(
              "bg-primary/10 border-primary/20",
              "hover:bg-primary/20 transition-colors",
              "h-11 text-base"
            )}>
              <SelectValue placeholder="Select keyboard layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qwerty">Standard (QWERTY)</SelectItem>
              <SelectItem value="qwerty-uk">QWERTY - UK</SelectItem>
              <SelectItem value="dvorak">Dvorak</SelectItem>
              <SelectItem value="colemak">Colemak</SelectItem>
              <SelectItem value="colemak-uk">Colemak - UK</SelectItem>
              <SelectItem value="azerty">AZERTY</SelectItem>
              <SelectItem value="qwertz">QWERTZ</SelectItem>
              <SelectItem value="qwertz-sf">QWERTZ - Swiss French</SelectItem>
              <SelectItem value="numpad">Numpad (10-key)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium block mb-2">Test Reset Hotkey(s)</Label>
          <Select 
            value={settings.testResetHotkey} 
            onValueChange={(value) => onUpdateSettings({ testResetHotkey: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20 h-11 text-base">
              <SelectValue placeholder="Select reset hotkeys" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Enabled</SelectItem>
              <SelectItem value="shift-enter">Shift+Enter Only</SelectItem>
              <SelectItem value="ctrl-space">Ctrl+Space Only</SelectItem>
              <SelectItem value="ctrl-enter">Ctrl+Enter Only</SelectItem>
              <SelectItem value="disabled">Off/Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="phaseShift" 
            checked={settings.phaseShiftCorrection}
            onCheckedChange={(checked) => 
              onUpdateSettings({ phaseShiftCorrection: checked === true })
            }
            className="h-5 w-5"
          />
          <Label htmlFor="phaseShift" className="text-base cursor-pointer">
            Phase Shift Correction (auto-corrects misalignment with text)
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="doubleSpacing" 
            checked={settings.doubleSpacingBetweenSentences}
            onCheckedChange={(checked) => 
              onUpdateSettings({ doubleSpacingBetweenSentences: checked === true })
            }
            className="h-5 w-5"
          />
          <Label htmlFor="doubleSpacing" className="text-base cursor-pointer">
            Double spacing between sentences
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TextSettings;
