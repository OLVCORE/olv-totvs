import * as Sentry from '@sentry/nextjs';

/**
 * 🔍 MONITORING AVANÇADO COM SENTRY
 * 
 * Sistema completo de monitoramento de erros, performance
 * e métricas de negócio para produção.
 */

// ==========================================
// CONFIGURAÇÃO DO SENTRY
// ==========================================

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Configurações de ambiente
  environment: process.env.NODE_ENV,
  
  // Configurações de release
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Configurações de sampling
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Configurações de profiling
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Configurações de integração
  integrations: [
    new Sentry.BrowserTracing({
      // Configurações de tracing
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/olvinternacional\.com\.br/,
        /^https:\/\/api\.olvinternacional\.com\.br/,
      ],
      
      // Configurações de routing
      routingInstrumentation: Sentry.nextjsRouterInstrumentation({
        instrumentNavigation: true,
        instrumentPageLoad: true,
      }),
    }),
    
    new Sentry.Replay({
      // Configurações de replay
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
      
      // Configurações de sampling
      sessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
      errorSampleRate: 1.0,
    }),
  ],
  
  // Configurações de beforeSend
  beforeSend(event, hint) {
    // Filtrar eventos de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    
    // Filtrar erros conhecidos
    const error = hint.originalException;
    if (error instanceof Error) {
      // Ignorar erros de rede conhecidos
      if (error.message.includes('Network Error') || 
          error.message.includes('Failed to fetch')) {
        return null;
      }
      
      // Ignorar erros de CORS
      if (error.message.includes('CORS')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Configurações de beforeSendTransaction
  beforeSendTransaction(event) {
    // Filtrar transações de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    
    return event;
  },
  
  // Configurações de tags padrão
  initialScope: {
    tags: {
      component: 'olv-totvs-website',
      version: process.env.npm_package_version || '1.0.0',
    },
  },
});

// ==========================================
// FUNÇÕES DE MONITORING PERSONALIZADAS
// ==========================================

/**
 * Monitora performance de API
 */
export function monitorApiPerformance(
  operation: string,
  fn: () => Promise<any>
): Promise<any> {
  return Sentry.startSpan(
    {
      name: `API: ${operation}`,
      op: 'http.client',
      tags: {
        operation,
        type: 'api',
      },
    },
    async (span) => {
      try {
        const result = await fn();
        
        span.setStatus('ok');
        span.setData('success', true);
        
        return result;
      } catch (error) {
        span.setStatus('internal_error');
        span.setData('error', error.message);
        
        Sentry.captureException(error, {
          tags: {
            operation,
            type: 'api_error',
          },
        });
        
        throw error;
      }
    }
  );
}

/**
 * Monitora ações do usuário
 */
export function monitorUserAction(
  action: string,
  data?: Record<string, any>
): void {
  Sentry.addBreadcrumb({
    message: `User Action: ${action}`,
    category: 'user',
    level: 'info',
    data,
  });
  
  Sentry.captureMessage(`User Action: ${action}`, {
    level: 'info',
    tags: {
      action,
      type: 'user_action',
    },
    extra: data,
  });
}

/**
 * Monitora conversões de negócio
 */
export function monitorBusinessConversion(
  conversion: string,
  value?: number,
  data?: Record<string, any>
): void {
  Sentry.captureMessage(`Business Conversion: ${conversion}`, {
    level: 'info',
    tags: {
      conversion,
      type: 'business_conversion',
    },
    extra: {
      value,
      ...data,
    },
  });
  
  // Adicionar métrica customizada
  Sentry.metrics.increment('business.conversion', 1, {
    tags: {
      conversion_type: conversion,
    },
  });
}

/**
 * Monitora erros de validação
 */
export function monitorValidationError(
  field: string,
  error: string,
  data?: Record<string, any>
): void {
  Sentry.captureMessage(`Validation Error: ${field}`, {
    level: 'warning',
    tags: {
      field,
      type: 'validation_error',
    },
    extra: {
      error,
      ...data,
    },
  });
}

/**
 * Monitora performance de componentes
 */
export function monitorComponentPerformance(
  component: string,
  fn: () => void
): void {
  Sentry.startSpan(
    {
      name: `Component: ${component}`,
      op: 'react.component',
      tags: {
        component,
        type: 'component_performance',
      },
    },
    (span) => {
      try {
        fn();
        span.setStatus('ok');
      } catch (error) {
        span.setStatus('internal_error');
        Sentry.captureException(error, {
          tags: {
            component,
            type: 'component_error',
          },
        });
        throw error;
      }
    }
  );
}

// ==========================================
// HOOKS DE MONITORING PARA REACT
// ==========================================

/**
 * Hook para monitorar erros em componentes
 */
export function useErrorMonitoring() {
  const captureError = (error: Error, context?: Record<string, any>) => {
    Sentry.captureException(error, {
      tags: {
        type: 'react_error',
      },
      extra: context,
    });
  };
  
  const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    Sentry.captureMessage(message, {
      level,
      tags: {
        type: 'react_message',
      },
    });
  };
  
  return { captureError, captureMessage };
}

/**
 * Hook para monitorar performance de componentes
 */
export function usePerformanceMonitoring() {
  const startTiming = (name: string) => {
    return Sentry.startSpan(
      {
        name: `Performance: ${name}`,
        op: 'react.performance',
        tags: {
          name,
          type: 'performance',
        },
      },
      (span) => {
        return {
          end: () => span.setStatus('ok'),
          error: (error: Error) => {
            span.setStatus('internal_error');
            Sentry.captureException(error);
          },
        };
      }
    );
  };
  
  return { startTiming };
}

// ==========================================
// MIDDLEWARE DE MONITORING
// ==========================================

/**
 * Middleware para monitorar requisições de API
 */
export function withMonitoring<T extends any[]>(
  fn: (...args: T) => Promise<any>,
  operation: string
) {
  return async (...args: T) => {
    return monitorApiPerformance(operation, () => fn(...args));
  };
}

/**
 * Middleware para monitorar erros de validação
 */
export function withValidationMonitoring<T>(
  validator: (data: T) => { success: boolean; errors: string[] },
  field: string
) {
  return (data: T) => {
    const result = validator(data);
    
    if (!result.success) {
      result.errors.forEach(error => {
        monitorValidationError(field, error, { data });
      });
    }
    
    return result;
  };
}

// ==========================================
// CONFIGURAÇÕES DE AMBIENTE
// ==========================================

// Configurações específicas por ambiente
if (process.env.NODE_ENV === 'production') {
  // Configurações de produção
  Sentry.configureScope((scope) => {
    scope.setTag('environment', 'production');
    scope.setLevel('error');
  });
} else if (process.env.NODE_ENV === 'staging') {
  // Configurações de staging
  Sentry.configureScope((scope) => {
    scope.setTag('environment', 'staging');
    scope.setLevel('warning');
  });
} else {
  // Configurações de desenvolvimento
  Sentry.configureScope((scope) => {
    scope.setTag('environment', 'development');
    scope.setLevel('debug');
  });
}

// ==========================================
// EXPORTS
// ==========================================

export default Sentry;

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Sentry monitoring initialized');
  console.log(`   - Environment: ${process.env.NODE_ENV}`);
  console.log(`   - DSN: ${process.env.NEXT_PUBLIC_SENTRY_DSN ? 'Configured' : 'Not configured'}`);
  console.log(`   - Sample Rate: ${process.env.NODE_ENV === 'production' ? '10%' : '100%'}`);
}
