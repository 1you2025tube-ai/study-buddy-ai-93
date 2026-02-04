import { useNavigate } from 'react-router-dom';
import { LogOut, Coins, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { examStyles, languages } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();
  const { user, tokens, logout, quizSettings, updateQuizSettings } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">M</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground">MedPrep AI</h2>
              <p className="text-xs text-sidebar-muted">Exam Preparation</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Card */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="rounded-lg bg-sidebar-accent p-3">
              {!collapsed ? (
                <>
                  <p className="font-medium text-sidebar-foreground">{user?.fullName}</p>
                  <p className="text-xs text-sidebar-muted">{user?.role}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Coins className="h-4 w-4 text-sidebar-muted" />
                    <span className="text-sm text-sidebar-foreground">{tokens} Tokens</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Coins className="h-5 w-5 text-sidebar-muted" />
                  <span className="text-xs text-sidebar-foreground">{tokens}</span>
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-sidebar-border" />

        {/* Quiz Settings */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-sidebar-muted">
              <Settings className="h-4 w-4" />
              Quiz Settings
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-4 px-2">
              {/* Language */}
              <div className="space-y-2">
                <Label className="text-xs text-sidebar-muted">Language</Label>
                <Select
                  value={quizSettings.language}
                  onValueChange={(value) => updateQuizSettings({ language: value })}
                >
                  <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Style */}
              <div className="space-y-2">
                <Label className="text-xs text-sidebar-muted">Exam Style</Label>
                <Select
                  value={quizSettings.examStyle}
                  onValueChange={(value) => updateQuizSettings({ examStyle: value })}
                >
                  <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {examStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <Label className="text-xs text-sidebar-muted">Mode</Label>
                <RadioGroup
                  value={quizSettings.mode}
                  onValueChange={(value: 'tutor' | 'exam') => updateQuizSettings({ mode: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tutor" id="tutor" className="border-sidebar-muted" />
                    <Label htmlFor="tutor" className="text-sm text-sidebar-foreground cursor-pointer">
                      Tutor (Instant Feedback)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exam" id="exam" className="border-sidebar-muted" />
                    <Label htmlFor="exam" className="text-sm text-sidebar-foreground cursor-pointer">
                      Exam Simulation
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Questions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-sidebar-muted">Questions</Label>
                  <span className="text-sm text-sidebar-foreground">{quizSettings.questionCount}</span>
                </div>
                <Slider
                  value={[quizSettings.questionCount]}
                  onValueChange={([value]) => updateQuizSettings({ questionCount: value })}
                  min={5}
                  max={30}
                  step={5}
                  className="w-full"
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Log out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
