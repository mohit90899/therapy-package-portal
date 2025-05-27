
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tag, CheckCircle, X } from "lucide-react";
import { Voucher } from "@/utils/types";

interface VoucherCardProps {
  onVoucherApply: (voucher: Voucher | null) => void;
  packagePrice: number;
  appliedVoucher?: Voucher | null;
}

const VoucherCard = ({ onVoucherApply, packagePrice, appliedVoucher }: VoucherCardProps) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock vouchers - in real app, these would come from an API
  const availableVouchers: Voucher[] = [
    {
      id: "1",
      code: "FIRST10",
      discount: 10,
      description: "10% off your first therapy package",
      isActive: true,
      usageCount: 0,
      usageLimit: 100,
      minAmount: 50
    },
    {
      id: "2",
      code: "MENTAL20",
      discount: 20,
      description: "20% off mental wellness packages",
      isActive: true,
      usageCount: 15,
      usageLimit: 50,
      minAmount: 100
    }
  ];

  const handleApplyVoucher = () => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const voucher = availableVouchers.find(v => 
        v.code.toLowerCase() === voucherCode.toLowerCase()
      );

      if (!voucher) {
        setError("Invalid voucher code");
        setLoading(false);
        return;
      }

      if (!voucher.isActive) {
        setError("This voucher is no longer active");
        setLoading(false);
        return;
      }

      if (voucher.minAmount && packagePrice < voucher.minAmount) {
        setError(`Minimum order amount of $${voucher.minAmount} required`);
        setLoading(false);
        return;
      }

      if (voucher.usageLimit && voucher.usageCount >= voucher.usageLimit) {
        setError("This voucher has reached its usage limit");
        setLoading(false);
        return;
      }

      onVoucherApply(voucher);
      setLoading(false);
    }, 1000);
  };

  const handleRemoveVoucher = () => {
    onVoucherApply(null);
    setVoucherCode("");
    setError(null);
  };

  const calculateDiscount = (voucher: Voucher) => {
    return (packagePrice * voucher.discount) / 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Voucher Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!appliedVoucher ? (
          <>
            <div className="flex gap-2">
              <Input
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleApplyVoucher}
                disabled={!voucherCode.trim() || loading}
                variant="outline"
              >
                {loading ? "Applying..." : "Apply"}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <h4 className="font-medium mb-2">Available Vouchers:</h4>
              <div className="space-y-2">
                {availableVouchers.map((voucher) => (
                  <div 
                    key={voucher.id} 
                    className="flex items-center justify-between p-2 border rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => setVoucherCode(voucher.code)}
                  >
                    <div>
                      <Badge variant="outline" className="mr-2">{voucher.code}</Badge>
                      <span className="text-sm">{voucher.description}</span>
                    </div>
                    <span className="font-medium text-primary">{voucher.discount}% OFF</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Voucher Applied!</div>
                  <div className="text-sm text-muted-foreground">{appliedVoucher.description}</div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRemoveVoucher}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Discount ({appliedVoucher.discount}%):</span>
              <span className="text-green-600 font-medium">-${calculateDiscount(appliedVoucher).toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
