import { VendorOverview } from "@/components/vendor/vendor-overview"
import { VendorQuickActions } from "@/components/vendor/vendor-quick-actions"
import { ServiceManagementTable } from "@/components/vendor/service-management-table"
import { ConsultationInbox } from "@/components/vendor/consultation-inbox"
import { EarningsChart } from "@/components/vendor/earnings-chart"
import { VendorSettings } from "@/components/vendor/vendor-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VendorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Vendor Dashboard</h1>
        <p className="text-gray-400">Manage your services, consultations, and earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <VendorOverview />

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <VendorQuickActions />
          </div>

          <Tabs defaultValue="services" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 text-gray-400">
              <TabsTrigger value="services" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                Services
              </TabsTrigger>
              <TabsTrigger
                value="consultations"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                Consultations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="mt-4">
              <ServiceManagementTable />
            </TabsContent>
            <TabsContent value="consultations" className="mt-4">
              <ConsultationInbox />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <EarningsChart />

          <VendorSettings />
        </div>
      </div>
    </div>
  )
}
