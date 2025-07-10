'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Trash2, Plus, Settings, DollarSign, CreditCard, Globe, Database, Mail, Search, Tag } from 'lucide-react';

// Mock data for platform settings
const initialSettings = {
  general: {
    platformName: 'SkillHub Learning Platform',
    platformDescription: 'A comprehensive learning management system',
    supportEmail: 'support@skillhub.com',
    timezone: 'UTC',
    language: 'en',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true
  },
  financial: {
    currency: 'USD',
    taxRate: 10,
    platformCommission: 15,
    minimumPayout: 50,
    payoutSchedule: 'weekly',
    refundPolicy: '30 days'
  },
  integrations: {
    learnWorlds: { enabled: false, apiKey: '', secretKey: '' },
    paypal: { enabled: true, clientId: 'paypal_client_id', clientSecret: 'paypal_secret' },
    certifier: { enabled: false, apiKey: '', templateId: '' },
    typesense: { enabled: true, apiKey: 'typesense_key', host: 'localhost:8108' },
    resend: { enabled: true, apiKey: 'resend_api_key' },
    apify: { enabled: false, apiKey: '', actorId: '' }
  }
};

const categories = [
  { id: 1, name: 'Web Development', parent: null, children: [
    { id: 2, name: 'Frontend', parent: 1 },
    { id: 3, name: 'Backend', parent: 1 },
    { id: 4, name: 'Full Stack', parent: 1 }
  ]},
  { id: 5, name: 'Data Science', parent: null, children: [
    { id: 6, name: 'Machine Learning', parent: 5 },
    { id: 7, name: 'Data Analysis', parent: 5 }
  ]},
  { id: 8, name: 'Design', parent: null, children: [
    { id: 9, name: 'UI/UX', parent: 8 },
    { id: 10, name: 'Graphic Design', parent: 8 }
  ]}
];

const PlatformSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [newCategory, setNewCategory] = useState('');
  const [selectedParent, setSelectedParent] = useState<string>('');

  const updateGeneralSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, [key]: value }
    }));
  };

  const updateFinancialSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      financial: { ...prev.financial, [key]: value }
    }));
  };

  const updateIntegrationSetting = (integration: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: { ...prev.integrations[integration as keyof typeof prev.integrations], [key]: value }
      }
    }));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      // In a real app, this would make an API call
      console.log('Adding category:', newCategory, 'Parent:', selectedParent);
      setNewCategory('');
      setSelectedParent('');
    }
  };

  const saveSettings = () => {
    // In a real app, this would make an API call
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform-wide settings and integrations</p>
        </div>
        <Button onClick={saveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save All Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="checkout" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Checkout
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="mode" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Mode Config
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.general.platformName}
                    onChange={(e) => updateGeneralSetting('platformName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => updateGeneralSetting('supportEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platformDescription">Platform Description</Label>
                <Textarea
                  id="platformDescription"
                  value={settings.general.platformDescription}
                  onChange={(e) => updateGeneralSetting('platformDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone} onValueChange={(value) => updateGeneralSetting('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={settings.general.language} onValueChange={(value) => updateGeneralSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable the platform for maintenance</p>
                  </div>
                  <Switch
                    checked={settings.general.maintenanceMode}
                    onCheckedChange={(checked) => updateGeneralSetting('maintenanceMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-gray-500">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={settings.general.registrationEnabled}
                    onCheckedChange={(checked) => updateGeneralSetting('registrationEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Verification Required</Label>
                    <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.general.emailVerificationRequired}
                    onCheckedChange={(checked) => updateGeneralSetting('emailVerificationRequired', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={settings.financial.currency} onValueChange={(value) => updateFinancialSetting('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.financial.taxRate}
                    onChange={(e) => updateFinancialSetting('taxRate', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformCommission">Platform Commission (%)</Label>
                  <Input
                    id="platformCommission"
                    type="number"
                    value={settings.financial.platformCommission}
                    onChange={(e) => updateFinancialSetting('platformCommission', parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumPayout">Minimum Payout Amount</Label>
                  <Input
                    id="minimumPayout"
                    type="number"
                    value={settings.financial.minimumPayout}
                    onChange={(e) => updateFinancialSetting('minimumPayout', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payoutSchedule">Payout Schedule</Label>
                  <Select value={settings.financial.payoutSchedule} onValueChange={(value) => updateFinancialSetting('payoutSchedule', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refundPolicy">Refund Policy</Label>
                  <Select value={settings.financial.refundPolicy} onValueChange={(value) => updateFinancialSetting('refundPolicy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7 days">7 Days</SelectItem>
                      <SelectItem value="14 days">14 Days</SelectItem>
                      <SelectItem value="30 days">30 Days</SelectItem>
                      <SelectItem value="no refund">No Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checkout Settings */}
        <TabsContent value="checkout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                  <Input
                    id="paypalClientId"
                    value={settings.integrations.paypal.clientId}
                    onChange={(e) => updateIntegrationSetting('paypal', 'clientId', e.target.value)}
                    placeholder="Enter PayPal Client ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypalSecret">PayPal Client Secret</Label>
                  <Input
                    id="paypalSecret"
                    type="password"
                    value={settings.integrations.paypal.clientSecret}
                    onChange={(e) => updateIntegrationSetting('paypal', 'clientSecret', e.target.value)}
                    placeholder="Enter PayPal Client Secret"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable PayPal Payments</Label>
                    <p className="text-sm text-gray-500">Allow users to pay with PayPal</p>
                  </div>
                  <Switch
                    checked={settings.integrations.paypal.enabled}
                    onCheckedChange={(checked) => updateIntegrationSetting('paypal', 'enabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          {/* LearnWorlds Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                LearnWorlds Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable LearnWorlds Sync</Label>
                  <p className="text-sm text-gray-500">Sync courses and users with LearnWorlds</p>
                </div>
                <Switch
                  checked={settings.integrations.learnWorlds.enabled}
                  onCheckedChange={(checked) => updateIntegrationSetting('learnWorlds', 'enabled', checked)}
                />
              </div>
              {settings.integrations.learnWorlds.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input
                      value={settings.integrations.learnWorlds.apiKey}
                      onChange={(e) => updateIntegrationSetting('learnWorlds', 'apiKey', e.target.value)}
                      placeholder="Enter LearnWorlds API Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input
                      type="password"
                      value={settings.integrations.learnWorlds.secretKey}
                      onChange={(e) => updateIntegrationSetting('learnWorlds', 'secretKey', e.target.value)}
                      placeholder="Enter Secret Key"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Typesense Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Typesense Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Typesense Search</Label>
                  <p className="text-sm text-gray-500">Enhanced search functionality</p>
                </div>
                <Switch
                  checked={settings.integrations.typesense.enabled}
                  onCheckedChange={(checked) => updateIntegrationSetting('typesense', 'enabled', checked)}
                />
              </div>
              {settings.integrations.typesense.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input
                      value={settings.integrations.typesense.apiKey}
                      onChange={(e) => updateIntegrationSetting('typesense', 'apiKey', e.target.value)}
                      placeholder="Enter Typesense API Key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Host</Label>
                    <Input
                      value={settings.integrations.typesense.host}
                      onChange={(e) => updateIntegrationSetting('typesense', 'host', e.target.value)}
                      placeholder="localhost:8108"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resend Email Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Resend Email Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Resend Email</Label>
                  <p className="text-sm text-gray-500">Transactional email service</p>
                </div>
                <Switch
                  checked={settings.integrations.resend.enabled}
                  onCheckedChange={(checked) => updateIntegrationSetting('resend', 'enabled', checked)}
                />
              </div>
              {settings.integrations.resend.enabled && (
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    value={settings.integrations.resend.apiKey}
                    onChange={(e) => updateIntegrationSetting('resend', 'apiKey', e.target.value)}
                    placeholder="Enter Resend API Key"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Management */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Category */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-3">Add New Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Select value={selectedParent} onValueChange={setSelectedParent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Parent (Top Level)</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addCategory} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              </div>

              {/* Categories Tree */}
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {category.children && category.children.length > 0 && (
                      <div className="ml-6 mt-2 space-y-1">
                        {category.children.map(child => (
                          <div key={child.id} className="flex items-center justify-between py-1">
                            <span className="text-sm text-gray-600">↳ {child.name}</span>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mode Configuration */}
        <TabsContent value="mode" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Mode Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform Mode</Label>
                  <Select defaultValue="production">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Current environment mode</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-gray-500">Enable detailed error logging</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Rate Limiting</Label>
                    <p className="text-sm text-gray-500">Enable API rate limiting</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache Enabled</Label>
                    <p className="text-sm text-gray-500">Enable application caching</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformSettings;