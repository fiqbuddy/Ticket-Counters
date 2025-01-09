'use client';
import { useState, useEffect } from "react";
import { 
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Badge,
  Container,
  Switch,
  keyframes,
} from '@mui/material';
import { styled } from '@mui/material/styles';


const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledTicketButton = styled(Button)(({ theme }) => ({
  padding: '20px 40px',
  fontSize: '1.2rem',
  borderRadius: '15px',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
}));

const NumberDisplay = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${pulse} 2s infinite ease-in-out`,
}));

interface Counter {
  id: number;
  isOnline: boolean;
  currentTicket: number | null;
  isServing: boolean;
}

export default function Home() {
  const [view, setView] = useState<'customer' | 'manager'>('customer');
  const [lastTicketNumber, setLastTicketNumber] = useState(0);
  const [currentlyServing, setCurrentlyServing] = useState<number | null>(null);
  const [waitingQueue, setWaitingQueue] = useState<number[]>([]);
  const [counters, setCounters] = useState<Counter[]>([
    { id: 1, isOnline: true, currentTicket: null, isServing: false },
    { id: 2, isOnline: true, currentTicket: null, isServing: false },
    { id: 3, isOnline: true, currentTicket: null, isServing: false },
    { id: 4, isOnline: true, currentTicket: null, isServing: false },
  ]);
  const [ticketTaken, setTicketTaken] = useState(false);

  
  useEffect(() => {
    if (ticketTaken) {
      const timer = setTimeout(() => setTicketTaken(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [ticketTaken]);

  const takeTicket = () => {
    const newTicketNumber = lastTicketNumber + 1;
    setLastTicketNumber(newTicketNumber);
    setWaitingQueue([...waitingQueue, newTicketNumber]);
  };

  const toggleCounterStatus = (counterId: number) => {
    setCounters(counters.map(counter => 
      counter.id === counterId 
        ? { ...counter, isOnline: !counter.isOnline, isServing: false, currentTicket: null }
        : counter
    ));
  };

  const serveNextCustomer = (counterId: number) => {
    if (waitingQueue.length === 0) return;

    const nextTicket = waitingQueue[0];
    const newWaitingQueue = waitingQueue.slice(1);

    setWaitingQueue(newWaitingQueue);
    setCurrentlyServing(nextTicket);
    setCounters(counters.map(counter =>
      counter.id === counterId
        ? { ...counter, currentTicket: nextTicket, isServing: true }
        : counter
    ));
  };

  const completeService = (counterId: number) => {
    setCounters(counters.map(counter =>
      counter.id === counterId
        ? { ...counter, currentTicket: null, isServing: false }
        : counter
    ));
  };

  const handleTakeTicket = () => {
    takeTicket();
    setTicketTaken(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: '20px',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
            onClick={() => setView(view === 'customer' ? 'manager' : 'customer')}
          >
            Switch to {view === 'customer' ? 'Manager' : 'Customer'} View
          </Button>
        </Box>

        {view === 'customer' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnimatedPaper 
              elevation={6}
              sx={{ 
                p: 4,
                maxWidth: 600,
                mx: 'auto',
                textAlign: 'center',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                  Now Serving:
                </Typography>
                <NumberDisplay>
                  {currentlyServing || '-'}
                </NumberDisplay>
                <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#666' }}>
                  Last Number:
                </Typography>
                <NumberDisplay>
                  {lastTicketNumber || '-'}
                </NumberDisplay>
              </Box>
              <StyledTicketButton
                onClick={handleTakeTicket}
                sx={{
                  transform: ticketTaken ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                Take a Number
              </StyledTicketButton>
            </AnimatedPaper>

            <Grid container spacing={3}>
              {counters.map((counter) => (
                <Grid item xs={3} key={counter.id}>
                  <AnimatedPaper
                    elevation={4}
                    sx={{
                      p: 3,
                      opacity: counter.isOnline ? 1 : 0.7,
                      borderRadius: '15px',
                      background: counter.isServing 
                        ? 'linear-gradient(to right bottom, #ffffff, #f0f7ff)'
                        : 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <StyledBadge
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: !counter.isOnline
                              ? '#9e9e9e'
                              : counter.isServing
                              ? '#f50057'
                              : '#4caf50',
                          },
                        }}
                      />
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontWeight: 'bold',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Counter {counter.id}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      align="center"
                      sx={{ 
                        mt: 2,
                        fontWeight: 'bold',
                        color: counter.isServing ? '#f50057' : '#666',
                      }}
                    >
                      {!counter.isOnline ? 'Offline' : counter.currentTicket || '-'}
                    </Typography>
                  </AnimatedPaper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Queue Status</Typography>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Waiting Numbers:
                  </Typography>
                  <Typography variant="body1">
                    {waitingQueue.join(', ') || 'Empty'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Currently Serving:
                  </Typography>
                  <Typography variant="body1">
                    {currentlyServing || 'None'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Grid container spacing={3}>
              {counters.map((counter) => (
                <Grid item xs={12} md={4} key={counter.id}>
                  <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Counter {counter.id}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>Status:</Typography>
                        <Switch
                          checked={counter.isOnline}
                          onChange={() => toggleCounterStatus(counter.id)}
                          color="success"
                        />
                      </Box>

                      {counter.isOnline && (
                        <>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Current Ticket:</Typography>
                            <Typography>{counter.currentTicket || 'None'}</Typography>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Button
                              variant="contained"
                              onClick={() => serveNextCustomer(counter.id)}
                              disabled={!counter.isOnline || counter.isServing}
                            >
                              Serve Next
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => completeService(counter.id)}
                              disabled={!counter.isServing}
                            >
                              Complete
                            </Button>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
