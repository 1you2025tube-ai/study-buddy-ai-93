import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Coins, Crown, Zap, CreditCard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WalletTab() {
  const { user, tokens, refillTokens, transactions, addTransaction } = useApp();
  const { toast } = useToast();

  const isPro = user?.plan !== 'free';

  const handleSelectPlan = (plan: string) => {
    toast({
      title: 'Payment Integration Coming Soon',
      description: `${plan} plan subscription will be available after backend integration.`,
    });
  };

  const handleRequestDemoTokens = () => {
    refillTokens(5);
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      activity: 'Demo Token Refill',
      model: 'System',
      tokensUsed: -5,
      systemCost: '$0.00',
    });
    toast({
      title: 'Refilled!',
      description: '5 demo tokens have been added to your account.',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Membership & Wallet</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPro ? (
                <>
                  <Crown className="h-5 w-5 text-primary" />
                  PRO MEMBER
                </>
              ) : (
                <>
                  <Coins className="h-5 w-5 text-muted-foreground" />
                  Free Plan
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPro ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Active until</p>
                  <p className="text-lg font-semibold">December 31, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tokens</p>
                  <p className="text-3xl font-bold text-primary">UNLIMITED</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-4xl font-bold">{tokens} <span className="text-lg font-normal text-muted-foreground">Tokens</span></p>
                </div>
                <p className="text-sm text-muted-foreground">
                  1 Quiz Generation = 1 Token
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Upgrade Your Brain
            </CardTitle>
            <CardDescription>
              {isPro ? 'Manage your subscription' : 'Choose your plan'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPro ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You're currently on the {user?.plan === 'pro_monthly' ? 'Monthly' : 'Annual'} plan.
                </p>
                <Button variant="outline" disabled>
                  Manage Subscription
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Monthly */}
                <div className="rounded-lg border p-4 hover:border-primary transition-colors">
                  <div className="mb-3">
                    <h3 className="font-semibold">Monthly</h3>
                    <p className="text-2xl font-bold">€9.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      1,200 Tokens / Mo
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      20% Bonus
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleSelectPlan('Monthly')}
                  >
                    Select Monthly
                  </Button>
                </div>

                {/* Annual */}
                <div className="rounded-lg border-2 border-primary p-4 relative">
                  <Badge className="absolute -top-2.5 right-2">Best Value</Badge>
                  <div className="mb-3">
                    <h3 className="font-semibold">Annual</h3>
                    <p className="text-2xl font-bold">€99.99<span className="text-sm font-normal text-muted-foreground">/yr</span></p>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      15,000 Tokens / Yr
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      50% Bonus
                    </li>
                  </ul>
                  <Button 
                    className="w-full"
                    onClick={() => handleSelectPlan('Annual')}
                  >
                    Select Annual
                  </Button>
                </div>
              </div>
            )}

            {!isPro && (
              <p className="mt-4 text-xs text-center text-muted-foreground">
                Unlimited quizzes, full exam history, and advanced analytics
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Up Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Top Up (One-Time)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Payment Integration Coming Soon
            </p>
            <Button onClick={handleRequestDemoTokens}>
              Request 5 Free Tokens (Demo)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="text-right">Tokens Used</TableHead>
                  <TableHead className="text-right">System Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.activity}</TableCell>
                    <TableCell>{tx.model}</TableCell>
                    <TableCell className={cn(
                      "text-right font-medium",
                      tx.tokensUsed < 0 ? "text-success" : ""
                    )}>
                      {tx.tokensUsed < 0 ? `+${Math.abs(tx.tokensUsed)}` : tx.tokensUsed}
                    </TableCell>
                    <TableCell className="text-right">{tx.systemCost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
