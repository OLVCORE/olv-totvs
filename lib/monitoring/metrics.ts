import * as Sentry from '@sentry/nextjs';

/**
 * 📊 MÉTRICAS DE NEGÓCIO
 * 
 * Sistema de métricas customizadas para monitorar
 * KPIs e conversões de negócio.
 */

// ==========================================
// TIPOS DE MÉTRICAS
// ==========================================

export interface BusinessMetrics {
  leads: {
    total: number;
    qualificados: number;
    convertidos: number;
    porOrigem: Record<string, number>;
    porSetor: Record<string, number>;
  };
  
  performance: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  
  conversions: {
    diagnosticoCompleto: number;
    contatoEnviado: number;
    downloadMaterial: number;
    agendamentoConsulta: number;
  };
  
  errors: {
    total: number;
    porTipo: Record<string, number>;
    porPagina: Record<string, number>;
  };
}

// ==========================================
// FUNÇÕES DE MÉTRICAS DE LEADS
// ==========================================

export function trackLeadCreated(leadData: {
  origem: string;
  setor: string;
  porte: string;
  score: number;
}): void {
  Sentry.metrics.increment('business.leads.created', 1, {
    tags: {
      origem: leadData.origem,
      setor: leadData.setor,
      porte: leadData.porte,
      score_range: getScoreRange(leadData.score),
    },
  });
  
  Sentry.captureMessage('Lead Created', {
    level: 'info',
    tags: {
      type: 'business_event',
      event: 'lead_created',
    },
    extra: leadData,
  });
}

export function trackLeadQualified(leadId: string, score: number): void {
  Sentry.metrics.increment('business.leads.qualified', 1, {
    tags: {
      score_range: getScoreRange(score),
    },
  });
  
  Sentry.addBreadcrumb({
    message: `Lead ${leadId} qualified with score ${score}`,
    category: 'business',
    level: 'info',
    data: { leadId, score },
  });
}

export function trackLeadConverted(leadId: string, conversionType: string): void {
  Sentry.metrics.increment('business.leads.converted', 1, {
    tags: {
      conversion_type: conversionType,
    },
  });
  
  Sentry.captureMessage('Lead Converted', {
    level: 'info',
    tags: {
      type: 'business_event',
      event: 'lead_converted',
    },
    extra: { leadId, conversionType },
  });
}

// ==========================================
// FUNÇÕES DE MÉTRICAS DE PERFORMANCE
// ==========================================

export function trackPageView(page: string, duration?: number): void {
  Sentry.metrics.increment('business.page_views', 1, {
    tags: {
      page,
    },
  });
  
  if (duration) {
    Sentry.metrics.distribution('business.page_duration', duration, {
      tags: {
        page,
      },
    });
  }
}

export function trackUserSession(sessionData: {
  duration: number;
  pageViews: number;
  isNewUser: boolean;
}): void {
  Sentry.metrics.distribution('business.session_duration', sessionData.duration);
  Sentry.metrics.distribution('business.session_page_views', sessionData.pageViews);
  
  if (sessionData.isNewUser) {
    Sentry.metrics.increment('business.new_users', 1);
  }
}

export function trackBounceRate(page: string, bounced: boolean): void {
  Sentry.metrics.increment('business.bounces', bounced ? 1 : 0, {
    tags: {
      page,
    },
  });
}

// ==========================================
// FUNÇÕES DE MÉTRICAS DE CONVERSÃO
// ==========================================

export function trackDiagnosticoCompleted(data: {
  stepsCompleted: number;
  timeSpent: number;
  setor: string;
  porte: string;
}): void {
  Sentry.metrics.increment('business.conversions.diagnostico', 1, {
    tags: {
      setor: data.setor,
      porte: data.porte,
      steps_completed: data.stepsCompleted.toString(),
    },
  });
  
  Sentry.metrics.distribution('business.diagnostico_time', data.timeSpent);
  
  Sentry.captureMessage('Diagnóstico Completed', {
    level: 'info',
    tags: {
      type: 'conversion',
      event: 'diagnostico_completed',
    },
    extra: data,
  });
}

export function trackContactFormSubmitted(data: {
  formType: string;
  success: boolean;
  errorType?: string;
}): void {
  Sentry.metrics.increment('business.conversions.contact_form', 1, {
    tags: {
      form_type: data.formType,
      success: data.success.toString(),
      error_type: data.errorType || 'none',
    },
  });
  
  if (!data.success) {
    Sentry.captureMessage('Contact Form Error', {
      level: 'warning',
      tags: {
        type: 'form_error',
        form_type: data.formType,
      },
      extra: { errorType: data.errorType },
    });
  }
}

export function trackMaterialDownloaded(data: {
  materialType: string;
  leadId?: string;
}): void {
  Sentry.metrics.increment('business.conversions.material_download', 1, {
    tags: {
      material_type: data.materialType,
    },
  });
  
  Sentry.captureMessage('Material Downloaded', {
    level: 'info',
    tags: {
      type: 'conversion',
      event: 'material_downloaded',
    },
    extra: data,
  });
}

export function trackConsultationScheduled(data: {
  leadId: string;
  preferredDate: string;
  consultationType: string;
}): void {
  Sentry.metrics.increment('business.conversions.consultation_scheduled', 1, {
    tags: {
      consultation_type: data.consultationType,
    },
  });
  
  Sentry.captureMessage('Consultation Scheduled', {
    level: 'info',
    tags: {
      type: 'conversion',
      event: 'consultation_scheduled',
    },
    extra: data,
  });
}

// ==========================================
// FUNÇÕES DE MÉTRICAS DE ERRO
// ==========================================

export function trackError(error: Error, context: {
  page?: string;
  component?: string;
  action?: string;
  userId?: string;
}): void {
  Sentry.metrics.increment('business.errors.total', 1, {
    tags: {
      error_type: error.constructor.name,
      page: context.page || 'unknown',
      component: context.component || 'unknown',
    },
  });
  
  Sentry.captureException(error, {
    tags: {
      type: 'business_error',
      page: context.page,
      component: context.component,
      action: context.action,
    },
    user: context.userId ? { id: context.userId } : undefined,
  });
}

export function trackApiError(endpoint: string, statusCode: number, error: string): void {
  Sentry.metrics.increment('business.api_errors', 1, {
    tags: {
      endpoint,
      status_code: statusCode.toString(),
    },
  });
  
  Sentry.captureMessage(`API Error: ${endpoint}`, {
    level: 'error',
    tags: {
      type: 'api_error',
      endpoint,
      status_code: statusCode,
    },
    extra: { error },
  });
}

// ==========================================
// FUNÇÕES DE MÉTRICAS DE SEGURANÇA
// ==========================================

export function trackSecurityEvent(event: {
  type: 'rate_limit' | 'suspicious_activity' | 'failed_login' | 'blocked_ip';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
}): void {
  Sentry.metrics.increment('business.security_events', 1, {
    tags: {
      event_type: event.type,
      severity: event.severity,
    },
  });
  
  Sentry.captureMessage(`Security Event: ${event.type}`, {
    level: event.severity === 'critical' ? 'error' : 'warning',
    tags: {
      type: 'security_event',
      event_type: event.type,
      severity: event.severity,
    },
    extra: event.details,
  });
}

export function trackFailedLogin(email: string, reason: string): void {
  Sentry.metrics.increment('business.failed_logins', 1, {
    tags: {
      reason,
    },
  });
  
  Sentry.captureMessage('Failed Login Attempt', {
    level: 'warning',
    tags: {
      type: 'security_event',
      event_type: 'failed_login',
    },
    extra: { email, reason },
  });
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function getScoreRange(score: number): string {
  if (score >= 90) return '90-100';
  if (score >= 80) return '80-89';
  if (score >= 70) return '70-79';
  if (score >= 60) return '60-69';
  return '0-59';
}

// ==========================================
// FUNÇÕES DE RELATÓRIO
// ==========================================

export function generateBusinessReport(): BusinessMetrics {
  // Esta função seria implementada para buscar dados do Sentry
  // e gerar relatórios consolidados
  
  return {
    leads: {
      total: 0,
      qualificados: 0,
      convertidos: 0,
      porOrigem: {},
      porSetor: {},
    },
    performance: {
      pageViews: 0,
      uniqueVisitors: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    },
    conversions: {
      diagnosticoCompleto: 0,
      contatoEnviado: 0,
      downloadMaterial: 0,
      agendamentoConsulta: 0,
    },
    errors: {
      total: 0,
      porTipo: {},
      porPagina: {},
    },
  };
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  trackLeadCreated,
  trackLeadQualified,
  trackLeadConverted,
  trackPageView,
  trackUserSession,
  trackBounceRate,
  trackDiagnosticoCompleted,
  trackContactFormSubmitted,
  trackMaterialDownloaded,
  trackConsultationScheduled,
  trackError,
  trackApiError,
  trackSecurityEvent,
  trackFailedLogin,
  generateBusinessReport,
};
