import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getPortfolioData,
  savePortfolioData,
  loginAdmin,
  checkAuthStatus,
  logoutAdmin,
} from "@/lib/portfolio";
import type {
  PortfolioData,
  HeroData,
  AboutData,
  SkillGroup,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CaseStudyItem,
} from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  LogOut,
  ExternalLink,
  Save,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  User,
  Wrench,
  GraduationCap,
  FolderDot,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    return await checkAuthStatus();
  },
  component: AdminComponent,
});

function AdminComponent() {
  const { isAuthenticated: initialAuth } = Route.useLoaderData();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Portfolio local state
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Active sub-tab state for projects
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>("");

  // Load portfolio data on mount/auth change
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      getPortfolioData()
        .then((data) => {
          setPortfolio(data);
          if (data.caseStudies && data.caseStudies.length > 0) {
            setActiveCaseStudyId(data.caseStudies[0].id);
          }
        })
        .catch((err) => {
          toast.error("Failed to load portfolio details.");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the password.");
      return;
    }
    setIsLoggingIn(true);
    try {
      await loginAdmin({ data: password });
      setIsAuthenticated(true);
      toast.success("Welcome back! Authenticated successfully.");
      router.invalidate();
    } catch (err: any) {
      toast.error(err.message || "Invalid password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
      setPortfolio(null);
      setPassword("");
      toast.success("Logged out successfully.");
      router.invalidate();
    } catch (err) {
      toast.error("Failed to logout.");
    }
  };

  const handleSave = async () => {
    if (!portfolio) return;
    setIsSaving(true);
    try {
      await savePortfolioData({ data: portfolio });
      toast.success("All portfolio changes saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save portfolio data.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper State Modifiers
  const updateHero = (fields: Partial<HeroData>) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      hero: { ...portfolio.hero, ...fields },
    });
  };

  const updateAbout = (fields: Partial<AboutData>) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      about: { ...portfolio.about, ...fields },
    });
  };

  const updateContact = (fields: Partial<AboutData["contact"]>) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      about: {
        ...portfolio.about,
        contact: { ...portfolio.about.contact, ...fields },
      },
    });
  };

  const updateBioParagraph = (index: number, val: string) => {
    if (!portfolio) return;
    const newBios = [...portfolio.about.bioParagraphs];
    newBios[index] = val;
    updateAbout({ bioParagraphs: newBios });
  };

  const addBioParagraph = () => {
    if (!portfolio) return;
    updateAbout({ bioParagraphs: [...portfolio.about.bioParagraphs, ""] });
  };

  const removeBioParagraph = (index: number) => {
    if (!portfolio) return;
    const newBios = portfolio.about.bioParagraphs.filter((_, i) => i !== index);
    updateAbout({ bioParagraphs: newBios });
  };

  // Skills helpers
  const updateSkillGroup = (gIndex: number, fields: Partial<SkillGroup>) => {
    if (!portfolio) return;
    const newSkills = [...portfolio.skills];
    newSkills[gIndex] = { ...newSkills[gIndex], ...fields };
    setPortfolio({ ...portfolio, skills: newSkills });
  };

  const addSkillTag = (gIndex: number, newSkill: string) => {
    if (!portfolio || !newSkill.trim()) return;
    const group = portfolio.skills[gIndex];
    if (group.skills.includes(newSkill.trim())) return;
    updateSkillGroup(gIndex, {
      skills: [...group.skills, newSkill.trim()],
    });
  };

  const removeSkillTag = (gIndex: number, sIndex: number) => {
    if (!portfolio) return;
    const group = portfolio.skills[gIndex];
    const newTags = group.skills.filter((_, i) => i !== sIndex);
    updateSkillGroup(gIndex, { skills: newTags });
  };

  const addSkillGroup = () => {
    if (!portfolio) return;
    const newGroup: SkillGroup = {
      num: String(portfolio.skills.length + 1).padStart(2, "0"),
      title: "New Category",
      icon: "CodeIcon",
      skills: ["Example Skill"],
      span: "md:col-span-2",
    };
    setPortfolio({
      ...portfolio,
      skills: [...portfolio.skills, newGroup],
    });
  };

  const removeSkillGroup = (index: number) => {
    if (!portfolio) return;
    const newGroups = portfolio.skills
      .filter((_, i) => i !== index)
      .map((g, idx) => ({ ...g, num: String(idx + 1).padStart(2, "0") }));
    setPortfolio({ ...portfolio, skills: newGroups });
  };

  // Experience helpers
  const updateExperience = (index: number, fields: Partial<ExperienceItem>) => {
    if (!portfolio) return;
    const list = [...portfolio.experience];
    list[index] = { ...list[index], ...fields };
    setPortfolio({ ...portfolio, experience: list });
  };

  const addExperience = () => {
    if (!portfolio) return;
    const newItem: ExperienceItem = {
      type: "Internship",
      title: "New Role",
      company: "Company Name",
      period: "Duration",
      description: "Description of your achievements",
    };
    setPortfolio({
      ...portfolio,
      experience: [...portfolio.experience, newItem],
    });
  };

  const removeExperience = (index: number) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      experience: portfolio.experience.filter((_, i) => i !== index),
    });
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const list = [...portfolio.experience];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setPortfolio({ ...portfolio, experience: list });
  };

  // Education helpers
  const updateEducation = (index: number, fields: Partial<EducationItem>) => {
    if (!portfolio) return;
    const list = [...portfolio.education];
    list[index] = { ...list[index], ...fields };
    setPortfolio({ ...portfolio, education: list });
  };

  const addEducation = () => {
    if (!portfolio) return;
    const newItem: EducationItem = {
      title: "Degree / Course Name",
      school: "Institution / School",
      period: "Year",
      description: "",
    };
    setPortfolio({
      ...portfolio,
      education: [...portfolio.education, newItem],
    });
  };

  const removeEducation = (index: number) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      education: portfolio.education.filter((_, i) => i !== index),
    });
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const list = [...portfolio.education];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setPortfolio({ ...portfolio, education: list });
  };

  // Projects & Case Studies helpers
  const updateProjectName = (key: string, name: string) => {
    if (!portfolio) return;
    const newList = portfolio.projects.map((p) =>
      p.key === key ? { ...p, name } : p,
    );
    setPortfolio({ ...portfolio, projects: newList });
  };

  const updateCaseStudy = (id: string, fields: Partial<CaseStudyItem>) => {
    if (!portfolio) return;
    const newList = portfolio.caseStudies.map((cs) =>
      cs.id === id ? { ...cs, ...fields } : cs,
    );
    setPortfolio({ ...portfolio, caseStudies: newList });
  };

  const updateCaseStudyStat = (
    csId: string,
    sIndex: number,
    fields: { n?: string; l?: string },
  ) => {
    if (!portfolio) return;
    const cs = portfolio.caseStudies.find((c) => c.id === csId);
    if (!cs) return;
    const newStats = [...cs.stats];
    newStats[sIndex] = { ...newStats[sIndex], ...fields };
    updateCaseStudy(csId, { stats: newStats });
  };

  // Add/remove projects entirely
  const addProject = () => {
    if (!portfolio) return;
    const key = `new-project-${Date.now().toString().slice(-4)}`;
    const newProj: ProjectItem = {
      key,
      name: "NEW PROJECT",
    };
    const newCS: CaseStudyItem = {
      id: key,
      title: "NEW PROJECT DETAILS",
      client: "Client Name",
      industry: "Industry Category",
      location: "Location",
      platforms: "HTML5, CSS3, JavaScript",
      goal: "Describe the core objective.",
      approach: "Describe your engineering approach.",
      stats: [
        { n: "100%", l: "Metric definition" },
        { n: "Fast", l: "Speed performance" },
        { n: "Custom", l: "Service type" },
      ],
      color: "#f0efeb",
      image: "ecommerce",
    };
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, newProj],
      caseStudies: [...portfolio.caseStudies, newCS],
    });
    setActiveCaseStudyId(key);
    toast.success("New project and case study created.");
  };

  const removeProject = (key: string) => {
    if (!portfolio) return;
    const filteredProjects = portfolio.projects.filter((p) => p.key !== key);
    const filteredCS = portfolio.caseStudies.filter((cs) => cs.id !== key);
    setPortfolio({
      ...portfolio,
      projects: filteredProjects,
      caseStudies: filteredCS,
    });
    if (activeCaseStudyId === key && filteredCS.length > 0) {
      setActiveCaseStudyId(filteredCS[0].id);
    }
    toast.info("Project removed.");
  };

  // 1. Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0efeb] px-4 font-sans text-[#111111]">
        <Toaster position="top-right" richColors />
        <Card className="w-full max-w-md border border-neutral-300 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-6 transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg text-white mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="font-display tracking-tight text-3xl font-black text-neutral-900">
              ADMIN CONTROL
            </CardTitle>
            <CardDescription className="text-neutral-500 font-medium mt-1">
              Authenticate to edit website pages dynamically
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-xs tracking-wider uppercase text-neutral-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 h-12 rounded-xl border-neutral-300 bg-white focus-visible:ring-black font-sans placeholder-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-12 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors font-bold text-sm tracking-wider shadow-md"
              >
                {isLoggingIn ? "Authenticating..." : "UNLOCK DASHBOARD"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-xs text-neutral-400 font-medium pt-2">
            Default password is <code className="mx-1.5 px-1 py-0.5 bg-neutral-200 text-neutral-700 rounded font-semibold">admin123</code>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 2. Render Main Admin Dashboard
  if (isLoading || !portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0efeb]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="font-display text-sm tracking-widest text-neutral-600">LOADING DATA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#111111] font-sans pb-32">
      <Toaster position="top-right" richColors />

      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-display font-black text-xl">
              R
            </div>
            <div>
              <h1 className="font-display tracking-tight text-xl font-black">PORTFOLIO ADMIN</h1>
              <p className="text-xs text-neutral-500 font-medium">Edit live sections dynamically</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors text-xs font-bold tracking-wider uppercase bg-white shadow-sm"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="px-4.5 py-2.5 h-auto rounded-full border-neutral-300 hover:bg-neutral-50 text-xs font-bold tracking-wider uppercase text-neutral-800"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Tab Panel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="hero" className="space-y-8">
          <div className="flex justify-center sm:justify-start overflow-x-auto pb-2 border-b border-neutral-200">
            <TabsList className="bg-neutral-100 p-1 rounded-full border border-neutral-200/50">
              <TabsTrigger
                value="hero"
                className="rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Hero
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5 mr-1.5 inline-block" />
                About & Contact
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <Wrench className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <GraduationCap className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Timeline
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                <FolderDot className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Projects
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: HERO */}
          <TabsContent value="hero" className="outline-none space-y-6">
            <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-display tracking-tight text-2xl font-black text-neutral-900">Hero Settings</CardTitle>
                <CardDescription className="text-neutral-500 font-medium">Edit the header branding and homepage hero metrics.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="hero-name" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Full Name (Subtitle)</Label>
                    <Input
                      id="hero-name"
                      value={portfolio.hero.name}
                      onChange={(e) => updateHero({ name: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11 bg-neutral-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-year" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Display Year</Label>
                    <Input
                      id="hero-year"
                      value={portfolio.hero.year}
                      onChange={(e) => updateHero({ year: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11 bg-neutral-50/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: ABOUT & CONTACT */}
          <TabsContent value="about" className="outline-none space-y-6">
            <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-display tracking-tight text-2xl font-black text-neutral-900">About Section</CardTitle>
                <CardDescription className="text-neutral-500 font-medium">Modify header text, tagline, and biographies.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="about-title" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Section Title</Label>
                    <Input
                      id="about-title"
                      value={portfolio.about.title}
                      onChange={(e) => updateAbout({ title: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about-subtitle" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Personal Tagline</Label>
                    <Input
                      id="about-subtitle"
                      value={portfolio.about.subtitle}
                      onChange={(e) => updateAbout({ subtitle: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                </div>

                {/* About portrait illustrations */}
                <div className="grid sm:grid-cols-2 gap-5 border-t border-neutral-100 pt-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Bio Cutout Photo</Label>
                    <select
                      value={portfolio.about.portraitCutout}
                      onChange={(e) => updateAbout({ portraitCutout: e.target.value })}
                      className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-sm focus-visible:ring-black"
                    >
                      <option value="portraitCutout">Riddhi Cutout (portrait_riddhi_cutout.png)</option>
                      <option value="portrait">Riddhi Normal (portrait.jpg)</option>
                      <option value="exercoachgym">Exercoach Mockup (exercoachgym.png)</option>
                      <option value="meterReading">Meter Reading Mockup (meter_reading.png)</option>
                      <option value="ecommerce">E-Commerce Mockup (ecommerce.png)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Contact Section Photo</Label>
                    <select
                      value={portfolio.about.portrait}
                      onChange={(e) => updateAbout({ portrait: e.target.value })}
                      className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-sm focus-visible:ring-black"
                    >
                      <option value="portrait">Riddhi Normal (portrait.jpg)</option>
                      <option value="portraitCutout">Riddhi Cutout (portrait_riddhi_cutout.png)</option>
                      <option value="exercoachgym">Exercoach Mockup (exercoachgym.png)</option>
                      <option value="meterReading">Meter Reading Mockup (meter_reading.png)</option>
                      <option value="ecommerce">E-Commerce Mockup (ecommerce.png)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-700">Biography Paragraphs</Label>
                    <Button
                      onClick={addBioParagraph}
                      variant="outline"
                      className="h-8 px-3 rounded-full text-xs font-bold border-neutral-300 hover:bg-neutral-50"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Add Paragraph
                    </Button>
                  </div>
                  {portfolio.about.bioParagraphs.map((para, index) => (
                    <div key={index} className="flex gap-3 items-start group">
                      <div className="flex-grow">
                        <Textarea
                          value={para}
                          onChange={(e) => updateBioParagraph(index, e.target.value)}
                          rows={3}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black resize-none"
                          placeholder="Write biography paragraph..."
                        />
                      </div>
                      <Button
                        onClick={() => removeBioParagraph(index)}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl flex-shrink-0 h-9 w-9 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-display tracking-tight text-2xl font-black text-neutral-900">Contact Details & Socials</CardTitle>
                <CardDescription className="text-neutral-500 font-medium">Link links, icons, email, and phone references.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={portfolio.about.contact.email}
                      onChange={(e) => updateContact({ email: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Phone number</Label>
                    <Input
                      id="contact-phone"
                      value={portfolio.about.contact.phone}
                      onChange={(e) => updateContact({ phone: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-linkedin" className="text-xs font-bold tracking-wider uppercase text-neutral-600">LinkedIn URL</Label>
                    <Input
                      id="contact-linkedin"
                      value={portfolio.about.contact.linkedin}
                      onChange={(e) => updateContact({ linkedin: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-instagram" className="text-xs font-bold tracking-wider uppercase text-neutral-600">Instagram URL</Label>
                    <Input
                      id="contact-instagram"
                      value={portfolio.about.contact.instagram}
                      onChange={(e) => updateContact({ instagram: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <Label htmlFor="contact-tiktok" className="text-xs font-bold tracking-wider uppercase text-neutral-600">TikTok URL</Label>
                    <Input
                      id="contact-tiktok"
                      value={portfolio.about.contact.tiktok}
                      onChange={(e) => updateContact({ tiktok: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: SKILLS */}
          <TabsContent value="skills" className="outline-none space-y-6">
            <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm mb-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-display tracking-tight text-2xl font-black text-neutral-900">Skills Section Headers</CardTitle>
                <CardDescription className="text-neutral-500 font-medium">Tweak the header title and paragraph for the toolkit section.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Skills Title</Label>
                  <Input
                    value={portfolio.skillsTitle}
                    onChange={(e) => setPortfolio({ ...portfolio, skillsTitle: e.target.value })}
                    className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Skills Subtitle Description</Label>
                  <Textarea
                    value={portfolio.skillsSubtitle}
                    onChange={(e) => setPortfolio({ ...portfolio, skillsSubtitle: e.target.value })}
                    className="rounded-xl border-neutral-300 focus-visible:ring-black h-18 resize-none text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <h3 className="font-display tracking-tight text-xl font-black text-neutral-900">Skills Categories Toolkit</h3>
              <Button
                onClick={addSkillGroup}
                className="rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold tracking-wider uppercase h-10 px-5 shadow"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Category
              </Button>
            </div>

            <div className="grid gap-6">
              {portfolio.skills.map((group, gIndex) => (
                <Card key={gIndex} className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                  <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => removeSkillGroup(gIndex)}
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Category Index</Label>
                        <span className="block font-sans text-neutral-400 text-sm font-semibold tracking-wider bg-neutral-100 px-3.5 py-1.5 rounded-lg w-fit">
                          {group.num}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Group Title</Label>
                        <Input
                          value={group.title}
                          onChange={(e) => updateSkillGroup(gIndex, { title: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Tailwind Grid Span</Label>
                          <select
                            value={group.span}
                            onChange={(e) => updateSkillGroup(gIndex, { span: e.target.value })}
                            className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-sm focus-visible:ring-black"
                          >
                            <option value="md:col-span-1">col-span-1</option>
                            <option value="md:col-span-2">col-span-2</option>
                            <option value="md:col-span-3">col-span-3</option>
                            <option value="md:col-span-4">col-span-4</option>
                            <option value="md:col-span-6">col-span-6</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Icon Asset</Label>
                          <select
                            value={group.icon}
                            onChange={(e) => updateSkillGroup(gIndex, { icon: e.target.value })}
                            className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-sm focus-visible:ring-black"
                          >
                            <option value="CodeIcon">Code</option>
                            <option value="ServerIcon">Server</option>
                            <option value="DatabaseIcon">Database</option>
                            <option value="WrenchIcon">Wrench</option>
                            <option value="ErpIcon">Connected Circles</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-4">
                      <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500 block mb-2">Skills Tags</Label>
                      <div className="flex flex-wrap gap-2 bg-neutral-50 p-4 border border-neutral-200 border-dashed rounded-2xl min-h-[80px] items-center">
                        {group.skills.map((skill, sIndex) => (
                          <div
                            key={sIndex}
                            className="bg-white border border-neutral-200 hover:border-red-300 rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>{skill}</span>
                            <button
                              onClick={() => removeSkillTag(gIndex, sIndex)}
                              className="text-neutral-400 hover:text-red-500 font-bold transition-colors text-[10px] w-4 h-4 rounded-full bg-neutral-100 hover:bg-red-50 flex items-center justify-center"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add new Skill Tag input */}
                      <div className="flex gap-2 max-w-sm">
                        <Input
                          placeholder="Add skill tag..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = e.currentTarget;
                              addSkillTag(gIndex, input.value);
                              input.value = "";
                            }
                          }}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-xs"
                        />
                        <Button
                          onClick={(e) => {
                            const container = e.currentTarget.parentElement;
                            const input = container?.querySelector("input") as HTMLInputElement;
                            if (input) {
                              addSkillTag(gIndex, input.value);
                              input.value = "";
                            }
                          }}
                          variant="outline"
                          className="h-10 px-4 text-xs font-bold rounded-xl border-neutral-300 hover:bg-neutral-50 flex-shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 4: TIMELINE (EXPERIENCE & EDUCATION) */}
          <TabsContent value="timeline" className="outline-none space-y-8">
            <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm mb-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-display tracking-tight text-2xl font-black text-neutral-900">Timeline Section Headers</CardTitle>
                <CardDescription className="text-neutral-500 font-medium">Customize structural headings for your academic and work milestones.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Main Title</Label>
                    <Input
                      value={portfolio.experienceTitle}
                      onChange={(e) => setPortfolio({ ...portfolio, experienceTitle: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Experience Subheading</Label>
                    <Input
                      value={portfolio.experienceSub}
                      onChange={(e) => setPortfolio({ ...portfolio, experienceSub: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold tracking-wider uppercase text-neutral-600">Education Subheading</Label>
                    <Input
                      value={portfolio.educationSub}
                      onChange={(e) => setPortfolio({ ...portfolio, educationSub: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4A. Experience and Courses */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display tracking-tight text-xl font-black text-neutral-900">Experience & Courses</h3>
                <Button
                  onClick={addExperience}
                  className="rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold tracking-wider uppercase h-10 px-5 shadow"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Timeline
                </Button>
              </div>

              <div className="space-y-4">
                {portfolio.experience.map((exp, index) => (
                  <Card key={index} className="border border-neutral-200 bg-white rounded-3xl p-5 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-4 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => moveExperience(index, "up")}
                        disabled={index === 0}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg h-8 w-8"
                      >
                        <ArrowUp className="w-4.5 h-4.5" />
                      </Button>
                      <Button
                        onClick={() => moveExperience(index, "down")}
                        disabled={index === portfolio.experience.length - 1}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg h-8 w-8"
                      >
                        <ArrowDown className="w-4.5 h-4.5" />
                      </Button>
                      <Button
                        onClick={() => removeExperience(index)}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>

                    <div className="grid sm:grid-cols-4 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Classification</Label>
                        <select
                          value={exp.type}
                          onChange={(e) => updateExperience(index, { type: e.target.value })}
                          className="w-full h-10 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-xs focus-visible:ring-black"
                        >
                          <option value="Internship">Internship</option>
                          <option value="Course">Course</option>
                          <option value="Job">Full Time Job</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Role Title</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) => updateExperience(index, { title: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Company / Host</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, { company: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Period Duration</Label>
                        <Input
                          value={exp.period}
                          onChange={(e) => updateExperience(index, { period: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                          placeholder="e.g. Apr 2026 - May 2026"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-4 space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Achievement Summary (Optional)</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, { description: e.target.value })}
                          rows={2}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black text-sm resize-none"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 4B. Education */}
            <div className="space-y-6 pt-6 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <h3 className="font-display tracking-tight text-xl font-black text-neutral-900">Academic Education</h3>
                <Button
                  onClick={addEducation}
                  className="rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold tracking-wider uppercase h-10 px-5 shadow"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Academic
                </Button>
              </div>

              <div className="space-y-4">
                {portfolio.education.map((edu, index) => (
                  <Card key={index} className="border border-neutral-200 bg-white rounded-3xl p-5 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-4 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => moveEducation(index, "up")}
                        disabled={index === 0}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg h-8 w-8"
                      >
                        <ArrowUp className="w-4.5 h-4.5" />
                      </Button>
                      <Button
                        onClick={() => moveEducation(index, "down")}
                        disabled={index === portfolio.education.length - 1}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg h-8 w-8"
                      >
                        <ArrowDown className="w-4.5 h-4.5" />
                      </Button>
                      <Button
                        onClick={() => removeEducation(index)}
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Degree / Certificate</Label>
                        <Input
                          value={edu.title}
                          onChange={(e) => updateEducation(index, { title: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">School / University</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(index, { school: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Period Year</Label>
                        <Input
                          value={edu.period}
                          onChange={(e) => updateEducation(index, { period: e.target.value })}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                          placeholder="e.g. Apr 2025"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-3 space-y-2">
                        <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Sub-description (Optional)</Label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) => updateEducation(index, { description: e.target.value })}
                          rows={2}
                          className="rounded-xl border-neutral-300 focus-visible:ring-black text-sm resize-none"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: PROJECTS & CASE STUDIES */}
          <TabsContent value="projects" className="outline-none space-y-6">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Left sidebar listing projects */}
              <div className="md:col-span-4 space-y-4">
                <Card className="border border-neutral-200 bg-white rounded-3xl p-4.5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                    <h3 className="font-display tracking-tight text-sm font-black text-neutral-900">Section Header</h3>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">Projects Header Title</Label>
                    <Input
                      value={portfolio.projectsTitle}
                      onChange={(e) => setPortfolio({ ...portfolio, projectsTitle: e.target.value })}
                      className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-xs"
                    />
                  </div>
                </Card>

                <div className="flex justify-between items-center border-b border-neutral-200 pb-2 pt-2">
                  <h3 className="font-display tracking-tight text-base font-black text-neutral-900">Projects Index</h3>
                  <Button
                    onClick={addProject}
                    variant="outline"
                    className="h-8 px-2.5 rounded-full text-xs font-bold border-neutral-300 hover:bg-neutral-50"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    New Project
                  </Button>
                </div>
                <div className="space-y-2">
                  {portfolio.projects.map((p) => (
                    <div
                      key={p.key}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left cursor-pointer transition-all shadow-sm ${
                        activeCaseStudyId === p.key
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
                      }`}
                      onClick={() => setActiveCaseStudyId(p.key)}
                    >
                      <div className="truncate flex-grow mr-2">
                        <div className="text-[10px] font-bold tracking-wider uppercase opacity-60 truncate">
                          {p.key}
                        </div>
                        <input
                          type="text"
                          value={p.name}
                          onClick={(e) => e.stopPropagation()} // Prevent selecting row on click
                          onChange={(e) => updateProjectName(p.key, e.target.value)}
                          className={`font-display tracking-tighter text-sm font-black bg-transparent border-b border-transparent focus:border-current focus:outline-none w-full truncate mt-1 ${
                            activeCaseStudyId === p.key ? "text-white" : "text-black"
                          }`}
                        />
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(p.key);
                        }}
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-lg flex-shrink-0 hover:bg-red-50 hover:text-red-500 ${
                          activeCaseStudyId === p.key ? "text-white/60 hover:text-red-300" : "text-neutral-400"
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side case study editor */}
              <div className="md:col-span-8">
                {activeCaseStudyId ? (
                  (() => {
                    const cs = portfolio.caseStudies.find(
                      (c) => c.id === activeCaseStudyId,
                    );
                    if (!cs) {
                      return (
                        <div className="text-center bg-white border border-neutral-200 p-12 rounded-3xl text-neutral-400">
                          Select a project to configure.
                        </div>
                      );
                    }
                    return (
                      <Card className="border border-neutral-200 bg-white rounded-3xl p-6 shadow-sm space-y-6">
                        <CardHeader className="px-0 pt-0 border-b border-neutral-100 pb-4">
                          <CardTitle className="font-display tracking-tight text-xl font-black">
                            Case Study Config:{" "}
                            <span className="text-neutral-400 text-base font-normal">
                              {cs.id}
                            </span>
                          </CardTitle>
                          <CardDescription className="text-neutral-500 font-medium">
                            Configure full page metrics, goals, and layout illustrations for this case study.
                          </CardDescription>
                        </CardHeader>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Study Title</Label>
                            <Input
                              value={cs.title}
                              onChange={(e) => updateCaseStudy(cs.id, { title: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Client</Label>
                            <Input
                              value={cs.client}
                              onChange={(e) => updateCaseStudy(cs.id, { client: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Industry</Label>
                            <Input
                              value={cs.industry}
                              onChange={(e) => updateCaseStudy(cs.id, { industry: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Location</Label>
                            <Input
                              value={cs.location}
                              onChange={(e) => updateCaseStudy(cs.id, { location: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2 space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Platforms / Tech Used</Label>
                            <Input
                              value={cs.platforms}
                              onChange={(e) => updateCaseStudy(cs.id, { platforms: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                              placeholder="e.g. Python, OCR, Web App"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Goal Description</Label>
                          <Textarea
                            value={cs.goal}
                            onChange={(e) => updateCaseStudy(cs.id, { goal: e.target.value })}
                            rows={3}
                            className="rounded-xl border-neutral-300 focus-visible:ring-black text-sm resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Approach Description</Label>
                          <Textarea
                            value={cs.approach}
                            onChange={(e) => updateCaseStudy(cs.id, { approach: e.target.value })}
                            rows={3}
                            className="rounded-xl border-neutral-300 focus-visible:ring-black text-sm resize-none"
                          />
                        </div>

                        {/* Visual settings */}
                        <div className="grid sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Background Color</Label>
                            <Input
                              value={cs.color}
                              onChange={(e) => updateCaseStudy(cs.id, { color: e.target.value })}
                              className="rounded-xl border-neutral-300 focus-visible:ring-black h-10 text-sm"
                              placeholder="e.g. #f0efeb or rgba(0,0,0,0.05)"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500">Illustration Image</Label>
                            <select
                              value={cs.image}
                              onChange={(e) => updateCaseStudy(cs.id, { image: e.target.value })}
                              className="w-full h-10 rounded-xl border border-neutral-300 bg-white px-3 font-sans text-xs focus-visible:ring-black"
                            >
                              <option value="exercoachgym">Exercoach Gym Mockup (exercoachgym.png)</option>
                              <option value="meterReading">Meter Reading OCR (meter_reading.png)</option>
                              <option value="ecommerce">E-Commerce Mockup (ecommerce.png)</option>
                              <option value="portrait">Riddhi Normal Portrait (portrait.jpg)</option>
                              <option value="portraitCutout">Riddhi Cutout Portrait (portrait_riddhi_cutout.png)</option>
                            </select>
                          </div>
                        </div>

                        {/* Three statistics */}
                        <div className="space-y-4 border-t border-neutral-100 pt-4">
                          <Label className="text-xs font-bold tracking-wider uppercase text-neutral-500 block">Case Study Metrics / Statistics (3 Max)</Label>
                          <div className="grid sm:grid-cols-3 gap-4">
                            {cs.stats.map((st, sIndex) => (
                              <div key={sIndex} className="bg-neutral-50 border border-neutral-200 p-4.5 rounded-2xl space-y-3 shadow-sm">
                                <div className="text-[10px] font-black text-neutral-400 uppercase">
                                  Metric {sIndex + 1}
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[10px] font-bold text-neutral-500 tracking-wide uppercase">Value</Label>
                                  <Input
                                    value={st.n}
                                    onChange={(e) => updateCaseStudyStat(cs.id, sIndex, { n: e.target.value })}
                                    className="h-8 text-xs rounded-lg border-neutral-300 bg-white"
                                    placeholder="e.g. 98%"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[10px] font-bold text-neutral-500 tracking-wide uppercase">Label</Label>
                                  <Input
                                    value={st.l}
                                    onChange={(e) => updateCaseStudyStat(cs.id, sIndex, { l: e.target.value })}
                                    className="h-8 text-xs rounded-lg border-neutral-300 bg-white"
                                    placeholder="e.g. speed"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })()
                ) : (
                  <div className="text-center bg-white border border-neutral-200 p-12 rounded-3xl text-neutral-400 shadow-sm">
                    No active project. Add a project on the left.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Save Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-neutral-200 py-4.5 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-xs sm:text-sm font-semibold text-neutral-600 truncate">
              Admin sessions active. Make changes in tabs above and save.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold tracking-wider uppercase h-11 px-7 shadow-lg flex-shrink-0"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Changes...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="w-4 h-4" />
                Save All Changes
              </span>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
