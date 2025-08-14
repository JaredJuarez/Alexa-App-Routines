// import { ActivityCard } from '@/components/ActivityCard';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { WeekStats } from '@/components/WeekStats';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import { mockHistoricalData } from '@/data/mockData';
// import { WeekActivity } from '@/types/training';
// import React, { useState } from 'react';
// import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

// export default function HistoryScreen() {
//   const [selectedWeek, setSelectedWeek] = useState<WeekActivity | null>(null);
//   const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());

//   const toggleWeekExpansion = (weekId: string) => {
//     const newExpanded = new Set(expandedWeeks);
//     if (newExpanded.has(weekId)) {
//       newExpanded.delete(weekId);
//     } else {
//       newExpanded.add(weekId);
//     }
//     setExpandedWeeks(newExpanded);
//   };

//   const formatWeekRange = (startDate: string, endDate: string) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     return `${start.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}`;
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <View style={styles.header}>
//         <ThemedText style={styles.title}>Histórico</ThemedText>
//         <ThemedText style={styles.subtitle}>Revisa tu progreso semanal</ThemedText>
//       </View>

//       <ScrollView 
//         style={styles.scrollView} 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {mockHistoricalData.map((weekData, index) => (
//           <ThemedView key={weekData.week} style={styles.weekContainer}>
//             <Pressable 
//               style={styles.weekHeader}
//               onPress={() => toggleWeekExpansion(weekData.week)}
//             >
//               <View style={styles.weekInfo}>
//                 <ThemedText style={styles.weekTitle}>Semana {weekData.week.split('-')[1]}</ThemedText>
//                 <ThemedText style={styles.weekRange}>
//                   {formatWeekRange(weekData.startDate, weekData.endDate)}
//                 </ThemedText>
//               </View>
              
//               <View style={styles.weekSummary}>
//                 <View style={styles.summaryItem}>
//                   <IconSymbol name="clock" size={16} color="#666" />
//                   <ThemedText style={styles.summaryText}>{weekData.totalDuration}min</ThemedText>
//                 </View>
//                 <View style={styles.summaryItem}>
//                   <IconSymbol name="flame" size={16} color="#FF6B6B" />
//                   <ThemedText style={styles.summaryText}>{weekData.totalCalories}</ThemedText>
//                 </View>
//                 <IconSymbol 
//                   name={expandedWeeks.has(weekData.week) ? "chevron.up" : "chevron.down"} 
//                   size={20} 
//                   color="#666" 
//                 />
//               </View>
//             </Pressable>

//             {expandedWeeks.has(weekData.week) && (
//               <View style={styles.weekContent}>
//                 <WeekStats
//                   totalDuration={weekData.totalDuration}
//                   totalCalories={weekData.totalCalories}
//                   completedActivities={weekData.completedActivities}
//                   totalActivities={weekData.activities.length}
//                 />
                
//                 <View style={styles.activitiesSection}>
//                   <ThemedText style={styles.sectionTitle}>Actividades Realizadas</ThemedText>
//                   {weekData.activities.length > 0 ? (
//                     weekData.activities.map((activity) => (
//                       <ActivityCard 
//                         key={activity.id} 
//                         activity={activity}
//                         showSource={true}
//                       />
//                     ))
//                   ) : (
//                     <ThemedView style={styles.emptyState}>
//                       <IconSymbol name="figure.walk.circle" size={48} color="#ccc" />
//                       <ThemedText style={styles.emptyText}>No hay actividades registradas</ThemedText>
//                     </ThemedView>
//                   )}
//                 </View>
//               </View>
//             )}
//           </ThemedView>
//         ))}

//         {mockHistoricalData.length === 0 && (
//           <ThemedView style={styles.emptyHistoryState}>
//             <IconSymbol name="chart.line.uptrend.xyaxis.circle" size={64} color="#ccc" />
//             <ThemedText style={styles.emptyHistoryTitle}>Sin historial aún</ThemedText>
//             <ThemedText style={styles.emptyHistoryText}>
//               Completa algunas actividades para ver tu progreso aquí
//             </ThemedText>
//           </ThemedView>
//         )}
//       </ScrollView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     padding: 20,
//     paddingTop: 80, // Aumentado de 60 a 80 para más espacio
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     opacity: 0.7,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 100, // Espacio para la barra de navegación
//   },
//   weekContainer: {
//     margin: 16,
//     marginBottom: 8,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   weekHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   weekInfo: {
//     flex: 1,
//   },
//   weekTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   weekRange: {
//     fontSize: 14,
//     opacity: 0.7,
//   },
//   weekSummary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   summaryText: {
//     fontSize: 12,
//     opacity: 0.8,
//   },
//   weekContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   activitiesSection: {
//     marginTop: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     marginLeft: 4,
//   },
//   emptyState: {
//     alignItems: 'center',
//     padding: 32,
//   },
//   emptyText: {
//     fontSize: 16,
//     opacity: 0.6,
//     marginTop: 8,
//   },
//   emptyHistoryState: {
//     alignItems: 'center',
//     padding: 48,
//     margin: 16,
//   },
//   emptyHistoryTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyHistoryText: {
//     fontSize: 16,
//     opacity: 0.6,
//     textAlign: 'center',
//     lineHeight: 24,
//   },
// });
