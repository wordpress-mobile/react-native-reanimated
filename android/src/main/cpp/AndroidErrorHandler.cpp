#include "AndroidErrorHandler.h"
#include "Logger.h"
#include <string>
#include <fbjni/fbjni.h>

using namespace facebook::jni;

AndroidErrorHandler::AndroidErrorHandler(std::shared_ptr<Scheduler> scheduler) {
  this->scheduler = scheduler;
  this->error = std::make_shared<ErrorWrapper>();
}

void AndroidErrorHandler::raiseSpec() {
  if (error->handled) {
    return;
  }

  static const auto cls = javaClassStatic();
  static auto method = cls->getStaticMethod<void(std::string)>("raise");
  method(cls, error->message);

  this->error->handled = true;
}

std::shared_ptr<Scheduler> AndroidErrorHandler::getScheduler() {
  return this->scheduler;
}

std::shared_ptr<ErrorWrapper> AndroidErrorHandler::getError() {
    return this->error;
}

void AndroidErrorHandler::setError(const char *message) {
  if (error->handled) {
    error->message = message;
    error->handled = false;
  }
}