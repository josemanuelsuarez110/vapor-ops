import AddServerForm from "@/components/dashboard/AddServerForm"
import ServerList from "@/components/dashboard/ServerList"
import { Server as ServerIcon, Plus } from "lucide-react"

export default function ServersPage() {
  const mockServers = [
    { id: '1', name: 'Main Prod', ip: '159.203.11.234', status: 'READY' }
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Servers</h1>
          <p className="text-white/50">Register and manage your target VPS instances.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ServerIcon className="w-5 h-5 text-indigo-400" />
            Your Infrastructure
          </h2>
          
          <ServerList servers={mockServers} />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            Add New Server
          </h2>
          <AddServerForm />
        </div>
      </div>
    </div>
  )
}
