import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import rawData from '../mocks/motorcycles.json';
import { Motorcycle, MotorcycleSection } from '../types/motorcycle';
import { groupMotorcyclesByCategory } from '../utils/groupMotorcycles';
import { SafeAreaView } from 'react-native-safe-area-context';

const motorcyclesData = rawData as Motorcycle[];

export default function HomeScreen() {
  const sections = useMemo(() => {
    return groupMotorcyclesByCategory(motorcyclesData);
  }, []);

  const renderItem: ListRenderItem<Motorcycle> = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.modelText}>{item.model}</Text>
        <Text style={styles.yearBadge}>{item.year}</Text>
      </View>
      <Text style={styles.brandText}>{item.brand}</Text>
    </View>
  );

  const renderSectionHeader = ({
    section: { title, total },
  }: {
    section: MotorcycleSection;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{total} modelos</Text>
    </View>
  );

  const renderSectionFooter = ({
    section: { total },
  }: {
    section: MotorcycleSection;
  }) => (
    <View style={styles.sectionFooter}>
      <Text style={styles.sectionFooterText}>
        Total: <Text style={styles.sectionFooterHighlight}>{total}</Text> motocicletas nesta categoria
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F7" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Motocicletas</Text>
        <Text style={styles.headerSubtitle}>
          {motorcyclesData.length} itens categorizados
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCount: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  sectionFooter: {
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  sectionFooterText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  sectionFooterHighlight: {
    fontWeight: '700',
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  brandText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  yearBadge: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
});