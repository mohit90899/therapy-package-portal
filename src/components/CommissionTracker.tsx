
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Percent } from "lucide-react";

interface CommissionData {
  totalRevenue: number;
  platformEarnings: number;
  therapistPayouts: number;
  commissionRate: number;
  recentTransactions: {
    id: string;
    type: "package" | "b2c";
    clientName: string;
    therapistName: string;
    amount: number;
    platformFee: number;
    date: string;
  }[];
}

interface CommissionTrackerProps {
  data: CommissionData;
}

const CommissionTracker = ({ data }: CommissionTrackerProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${data.platformEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Commission earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Therapist Payouts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${data.therapistPayouts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Paid to therapists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.commissionRate}%</div>
            <p className="text-xs text-muted-foreground">Platform fee</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest bookings and commission breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.type === "package" ? "default" : "secondary"}>
                      {transaction.type === "package" ? "Package" : "B2C Session"}
                    </Badge>
                    <span className="font-medium">{transaction.clientName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    with {transaction.therapistName} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                  <div className="text-sm text-green-600">
                    +${transaction.platformFee.toFixed(2)} commission
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionTracker;
