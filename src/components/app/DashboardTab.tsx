import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApp } from '@/contexts/AppContext';
import { mockPerformanceByTopic, mockDailyMissions, mockQuizHistory } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Trophy, Target, Flame, AlertTriangle, Brain, Sparkles } from 'lucide-react';

export function DashboardTab() {
  const { user, quizHistory, setIsSrsActive, getDueFlashcards } = useApp();
  const dueCards = getDueFlashcards();

  const totalExams = quizHistory.length;
  const totalQuestions = quizHistory.reduce((acc, q) => acc + q.total, 0);
  const totalCorrect = quizHistory.reduce((acc, q) => acc + q.score, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const weakestTopic = mockPerformanceByTopic.reduce(
    (min, topic) => topic.accuracy < min.accuracy ? topic : min,
    mockPerformanceByTopic[0]
  );

  const handleStartReview = () => {
    setIsSrsActive(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Performance</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{user?.fullName}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant={user?.plan === 'free' ? 'secondary' : 'default'}>
                    {user?.plan === 'free' ? 'Free Tier' : 'Pro Student'}
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>{user?.university || 'University not verified'}</p>
              <p>Member since {user?.memberSince}</p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Missions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Daily AI Mission
            </CardTitle>
            <CardDescription>Personalized activities to boost your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {dueCards.length > 0 && (
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Review Due Cards</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {dueCards.length} flashcards are due for review
                  </p>
                  <Button size="sm" variant="outline" onClick={handleStartReview}>
                    Start Review
                  </Button>
                </div>
              )}
              {mockDailyMissions.slice(0, dueCards.length > 0 ? 2 : 3).map((mission) => (
                <div key={mission.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {mission.type === 'review' ? (
                      <Brain className="h-4 w-4 text-primary" />
                    ) : (
                      <Target className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-medium text-sm">{mission.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{mission.description}</p>
                  <Button size="sm" variant="outline">
                    {mission.type === 'review' ? 'Start Review' : `Quiz: ${mission.topic}`}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      {totalExams > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Exams Taken</p>
                    <p className="text-2xl font-bold">{totalExams}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Questions Answered</p>
                    <p className="text-2xl font-bold">{totalQuestions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Trophy className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Accuracy</p>
                    <p className="text-2xl font-bold">{avgAccuracy}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <Flame className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Streak</p>
                    <p className="text-2xl font-bold">{user?.streak || 0} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Topic</CardTitle>
              <CardDescription>Your accuracy across different anatomy topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPerformanceByTopic} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} unit="%" />
                    <YAxis type="category" dataKey="topic" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Accuracy']}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                    <Bar 
                      dataKey="accuracy" 
                      fill="hsl(var(--primary))" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Focus Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Areas</CardTitle>
              <CardDescription>Topics that need more attention</CardDescription>
            </CardHeader>
            <CardContent>
              {weakestTopic.accuracy < 70 ? (
                <div className="flex items-center justify-between rounded-lg border border-warning/50 bg-warning/5 p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium">{weakestTopic.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        Current accuracy: {weakestTopic.accuracy}%
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Train {weakestTopic.topic}</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-success/50 bg-success/5 p-4">
                  <Trophy className="h-5 w-5 text-success" />
                  <p className="font-medium text-success">All systems go! Keep up the great work.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Exam History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Mode</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizHistory.slice(0, 5).map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>{result.topic}</TableCell>
                      <TableCell>
                        {result.score}/{result.total} ({Math.round((result.score / result.total) * 100)}%)
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {result.mode === 'tutor' ? 'Tutor' : 'Exam'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No quiz data yet</p>
            <p className="text-muted-foreground">Take a quiz to generate stats!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
