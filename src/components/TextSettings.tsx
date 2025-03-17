
import React from 'react';
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
import { cn } from '@/lib/utils';

interface TextSettingsProps {
  settings: TypingSettings;
  onUpdateSettings: (settings: Partial<TypingSettings>) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({ 
  settings, 
  onUpdateSettings
}) => {
  return (
    <div className="text-settings glass-card p-6">
      <h3 className="text-xl font-semibold text-center mb-5">Typing Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium block mb-2">Test Time</Label>
          <Select 
            value={settings.testTime} 
            onValueChange={(value) => onUpdateSettings({ testTime: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20">
              <SelectValue placeholder="Select test time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1min">1 minute</SelectItem>
              <SelectItem value="2min">2 minutes</SelectItem>
              <SelectItem value="5min">5 minutes</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium block mb-2">Text Color Highlighting</Label>
          <Select 
            value={settings.textColorHighlighting} 
            onValueChange={(value) => onUpdateSettings({ textColorHighlighting: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20">
              <SelectValue placeholder="Select highlighting style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="enhanced">Enhanced</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium block mb-2">Keyboard Layout</Label>
          <Select 
            value={settings.keyboardLayout} 
            onValueChange={(value) => onUpdateSettings({ keyboardLayout: value as any })}
          >
            <SelectTrigger className={cn(
              "bg-primary/10 border-primary/20",
              "hover:bg-primary/20 transition-colors"
            )}>
              <SelectValue placeholder="Select keyboard layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qwerty">Standard (QWERTY)</SelectItem>
              <SelectItem value="dvorak">Dvorak</SelectItem>
              <SelectItem value="colemak">Colemak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium block mb-2">Test Reset Hotkey(s)</Label>
          <Select 
            value={settings.testResetHotkey} 
            onValueChange={(value) => onUpdateSettings({ testResetHotkey: value as any })}
          >
            <SelectTrigger className="bg-primary/10 border-primary/20">
              <SelectValue placeholder="Select reset hotkeys" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Enabled</SelectItem>
              <SelectItem value="escape">Escape Only</SelectItem>
              <SelectItem value="ctrl+r">Ctrl+R Only</SelectItem>
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
          />
          <Label htmlFor="phaseShift" className="text-sm cursor-pointer">Phase Shift Correction</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="doubleSpacing" 
            checked={settings.doubleSpacingBetweenSentences}
            onCheckedChange={(checked) => 
              onUpdateSettings({ doubleSpacingBetweenSentences: checked === true })
            }
          />
          <Label htmlFor="doubleSpacing" className="text-sm cursor-pointer">Double spacing between sentences</Label>
        </div>
      </div>
    </div>
  );
};

export default TextSettings;
