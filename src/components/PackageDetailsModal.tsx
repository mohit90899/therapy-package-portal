
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TherapyPackage, Voucher } from "@/utils/types";
import { Clock, FileText, Users, CheckCircle, Star } from "lucide-react";
import VoucherCard from "./VoucherCard";

interface PackageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: TherapyPackage;
  onPurchase: (packageId: string, voucher?: Voucher | null) => void;
}

const PackageDetailsModal = ({ isOpen, onClose, package: pkg, onPurchase }: PackageDetailsModalProps) => {
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  const calculateFinalPrice = () => {
    if (!appliedVoucher) return pkg.price;
    const discount = (pkg.price * appliedVoucher.discount) / 100;
    return pkg.price - discount;
  };

  const totalDuration = pkg.sessionDetails?.reduce((sum, session) => sum + (session.duration || 0), 0) || 0;

  const handlePurchase = () => {
    onPurchase(pkg.id, appliedVoucher);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{pkg.title}</DialogTitle>
          <DialogDescription>By {pkg.therapistName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {pkg.image && (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{pkg.sessions}</div>
              <div className="text-sm text-muted-foreground">Sessions</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{Math.round(totalDuration / 60)}</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">${pkg.price}</div>
              <div className="text-sm text-muted-foreground">Total Price</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">${(pkg.price / pkg.sessions).toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Per Session</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Description</h4>
            <p className="text-muted-foreground">{pkg.description}</p>
          </div>

          {pkg.benefits && pkg.benefits.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">What You'll Get</h4>
              <ul className="space-y-2">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-3">Session Details</h4>
            <div className="space-y-3">
              {pkg.sessionDetails?.map((session, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{session.title || `Session ${index + 1}`}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.duration} minutes
                      </span>
                    </div>
                    {session.description && (
                      <div className="text-sm mt-1">{session.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pkg.tags && pkg.tags.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {pkg.documents && pkg.documents.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Resources Included</h4>
              <div className="space-y-2">
                {pkg.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{doc.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <VoucherCard
            packagePrice={pkg.price}
            onVoucherApply={setAppliedVoucher}
            appliedVoucher={appliedVoucher}
          />

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                {appliedVoucher && (
                  <>
                    <div className="text-sm line-through text-muted-foreground">${pkg.price}</div>
                    <div className="text-sm text-green-600">
                      Discount: -${((pkg.price * appliedVoucher.discount) / 100).toFixed(2)}
                    </div>
                  </>
                )}
                <div className="text-2xl font-bold">${calculateFinalPrice().toFixed(2)}</div>
              </div>
              <Button size="lg" onClick={handlePurchase}>
                Purchase Package
              </Button>
            </div>
          </div>

          {pkg.termsAndConditions && (
            <div className="text-xs text-muted-foreground">
              <strong>Terms & Conditions:</strong> {pkg.termsAndConditions}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailsModal;
